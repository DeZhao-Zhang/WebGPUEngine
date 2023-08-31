import * as buffer from "buffer";
import {BufferLike, decode, encode, RawImageData} from "jpeg-js";
(window as any).Buffer = buffer.Buffer;

// @ts-ignore
document.getElementById('fileinput').onchange = imageSelected;

function imageSelected(this: any, event: Event){
    const files = this.files;

    if(!files || files.length < 1){
        return;
    }

    if (files[0].type != 'image/jpeg'){
        console.log('file is not a jpeg!');
        return;
    }

    const dataUrlReader = new FileReader();
    dataUrlReader.addEventListener('load', function (){
        (document.getElementById('inputimage') as HTMLImageElement).src = dataUrlReader.result as string;
    });
    dataUrlReader.readAsDataURL(files[0]);

    const arrayReader = new FileReader();

    arrayReader.addEventListener("load", function (){
        const d = decode(arrayReader.result as ArrayBuffer);
        processImage(new Uint8Array(d.data), d.width, d.height).then(result => {
            //ENCODE TO JPEG DATA
            const resultImage : RawImageData<BufferLike> = {
                width: d.width,
                height: d.height,
                data: result
            }

            const encoded = encode(resultImage, 100)

            // AS DATA URL
            let binary = '';
            var bytes = new Uint8Array(encoded.data);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++){
                binary += String.fromCharCode(bytes[i]);
            }
            let processed = "data:" + files[0].type + ";base64,";
            processed += window.btoa(binary);

            //ASSIGN DATA URL TO OUTPUT IMAGE ELEMENT
            (document.getElementById('outputimage') as HTMLImageElement).src = processed;
        })
    })

    arrayReader.readAsArrayBuffer(files[0]);

}

async function processImage(array: Uint8Array, width: number, height: number): Promise<Uint8Array>{
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter?.requestDevice();

    return new Promise(async resolve => {
        const sizeArrays = new Int32Array([width, height]);
        const gpuWidthHeightBuffer = device.createBuffer({
            mappedAtCreation: true,
            size: sizeArrays.byteLength,
            usage: GPUBufferUsage.STORAGE
        })
        new Int32Array(gpuWidthHeightBuffer.getMappedRange()).set(sizeArrays);
        gpuWidthHeightBuffer.unmap();

        const gpuInputBuffer = device.createBuffer({
            mappedAtCreation: true,
            size: array.byteLength,
            usage: GPUBufferUsage.STORAGE
        });
        new Uint8Array(gpuInputBuffer.getMappedRange()).set(array);
        gpuInputBuffer.unmap();

        const gpuResultBuffer = device.createBuffer({
            size: array.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
        });

        const gpuReadBuffer = device.createBuffer({
            size: array.byteLength,
            usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
        })

        // BINDING GROUP LAYOUT
        const bindGroupLayout = device.createBindGroupLayout({
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.COMPUTE,
                    buffer: {
                        type: "read-only-storage"
                    }
                } as GPUBindGroupLayoutEntry,
                {
                    binding: 1,
                    visibility: GPUShaderStage.COMPUTE,
                    buffer: {
                        type: "read-only-storage"
                    }
                } as GPUBindGroupLayoutEntry,
                {
                    binding: 2,
                    visibility: GPUShaderStage.COMPUTE,
                    buffer: {
                        type: "storage"
                    }
                } as GPUBindGroupLayoutEntry,
            ]
        })

        const bindGroup = device.createBindGroup({
            layout: bindGroupLayout,
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: gpuWidthHeightBuffer
                    }
                },
                {
                    binding: 1,
                    resource: {
                        buffer: gpuInputBuffer
                    }
                },
                {
                    binding: 2,
                    resource: {
                        buffer: gpuResultBuffer
                    }
                }
            ]
        })

        // shader
        const shaderModule = device.createShaderModule({
            code : `
                struct Size {
                    size: vec2<u32>
                };

                struct Image {
                    rgba: array<u32>
                };
                
                fn decompose_rgba(rgba: u32) -> vec4<u32> {
                    let a = (rgba >> 24) & 0xFF;
                    let b = (rgba >> 16) & 0xFF;
                    let g = (rgba >> 8) & 0xFF;
                    let r = rgba & 0xFF;
                    return vec4(r, g, b, a);
                }

                fn compose_rgba(r: u32, g: u32, b: u32, a: u32) -> u32 {
                    return (a << 24) + (b << 16) + (g << 8) + r;
                }

                fn grayscale_avg(_rgba: u32) -> u32 {
                    let rgba = decompose_rgba(_rgba);
                    let gray = dot(vec3<u32>(rgba.x, rgba.y, rgba.z), vec3<u32>(1)) / 3;
                    return compose_rgba(gray, gray, gray, gray);
                }

                fn grayscale_luma(_rgba: u32) -> u32 {
                    let rgba = decompose_rgba(_rgba);
                    let gray = (u32(f32(rgba.x) * 0.3) + u32(f32(rgba.y) * 0.59) + u32(f32(rgba.z) * 0.11));
                    return compose_rgba(gray, gray, gray, 255);
                }

                @group(0) @binding(0) var<storage,read> widthHeight: Size;
                @group(0) @binding(1) var<storage,read> inputPixels: Image;
                @group(0) @binding(2) var<storage,read_write> outputPixels: Image;
                
                @compute
                @workgroup_size(16, 16)
                fn main(@builtin(global_invocation_id) global_id: vec3<u32>){
                    if (global_id.x >= widthHeight.size.x || global_id.y >= widthHeight.size.y) {
                        return;
                    }

                    let index : u32 = global_id.x + global_id.y * widthHeight.size.x;
                    outputPixels.rgba[index] = grayscale_avg(inputPixels.rgba[index]);
                }
            `
        });

        const computePipeline = device.createComputePipeline({
            layout: device.createPipelineLayout({
                bindGroupLayouts: [bindGroupLayout]
            }),
            compute: {
                module: shaderModule,
                entryPoint: "main"
            }
        })

        const commandEncoder = device.createCommandEncoder();
        const passEncoder = commandEncoder.beginComputePass();
        passEncoder.setPipeline(computePipeline);
        passEncoder.setBindGroup(0, bindGroup);
        passEncoder.dispatchWorkgroups(width, height);
        passEncoder.end();

        commandEncoder.copyBufferToBuffer(gpuResultBuffer, 0, gpuReadBuffer, 0, array.byteLength);
        device.queue.submit([commandEncoder.finish()]);
        await gpuReadBuffer.mapAsync(GPUMapMode.READ);
        resolve(new Uint8Array(gpuReadBuffer.getMappedRange()));
    })
}