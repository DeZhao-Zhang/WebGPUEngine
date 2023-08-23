import basicInstanced from './shaders/basic.instanced.vert.wgsl?raw'
import positionFrag from './shaders/position.frag.wgsl?raw'
import * as cube from './util/cube'
import { getMvpMatrix } from './util/math'

// initialize webgpu device & config canvas context
async function initWebGPU(canvas: HTMLCanvasElement) {
    if(!navigator.gpu)
        throw new Error('Not Support WebGPU')
    const adapter = await navigator.gpu.requestAdapter()
    if (!adapter)
        throw new Error('No Adapter Found')
    const device = await adapter.requestDevice()
    const context = canvas.getContext('webgpu') as GPUCanvasContext
    const format = navigator.gpu.getPreferredCanvasFormat ? navigator.gpu.getPreferredCanvasFormat() : context.getPreferredFormat(adapter)
    const devicePixelRatio = window.devicePixelRatio || 1
    canvas.width = canvas.clientWidth * devicePixelRatio
    canvas.height = canvas.clientHeight * devicePixelRatio
    const size = {width: canvas.width, height: canvas.height}
    context.configure({
        device, format,
        // prevent chrome warning after v102
        alphaMode: 'opaque'
    })
    return {device, context, format, size}
}

// create pipiline & buffers
async function initPipeline(device: GPUDevice, format: GPUTextureFormat, size:{width:number, height:number}) {
    const pipeline = await device.createRenderPipelineAsync({
        label: 'Basic Pipline',
        layout: 'auto',
        vertex: {
            module: device.createShaderModule({
                code: basicInstanced,
            }),
            entryPoint: 'main',
            buffers: [{
                arrayStride: 5 * 4, // 3 position 2 uv,
                attributes: [
                    {
                        // position
                        shaderLocation: 0,
                        offset: 0,
                        format: 'float32x3',
                    },
                    {
                        // uv
                        shaderLocation: 1,
                        offset: 3 * 4,
                        format: 'float32x2',
                    }
                ]
            }]
        },
        fragment: {
            module: device.createShaderModule({
                code: positionFrag,
            }),
            entryPoint: 'main',
            targets: [
                {
                    format: format
                }
            ]
        },
        primitive: {
            topology: 'triangle-list',
            // Culling backfaces pointing away from the camera
            cullMode: 'back'
        },
        // Enable depth testing since we have z-level positions
        // Fragment closest to the camera is rendered in front
        depthStencil: {
            depthWriteEnabled: true,
            depthCompare: 'less',
            format: 'depth24plus',
        }
    } as GPURenderPipelineDescriptor)
    // create depthTexture for renderPass
    const depthTexture = device.createTexture({
        size, format: 'depth24plus',
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
    })
    const depthView = depthTexture.createView()

    // create vertex buffer
    const vertexBuffer = device.createBuffer({
        label: 'GPUBuffer store vertex',
        size: cube.vertex.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    })
    device.queue.writeBuffer(vertexBuffer, 0, cube.vertex)
    // create a 4x4xNUM STORAGE buffer to store matrix
    const mvpBuffer = device.createBuffer({
        label: 'GPUBuffer store n*4x4 matrix',
        size: 4 * 4 * 4 * NUM, // 4 x 4 x float32 x NUM
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    })
    // create a uniform group for Matrix
    const group = device.createBindGroup({
        label: 'Uniform Group with matrix',
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: mvpBuffer
                }
            }
        ]
    })
    // return all vars
    return {pipeline, vertexBuffer, mvpBuffer, group, depthTexture, depthView}
}

// create & submit device commands
function draw(
    device: GPUDevice,
    renderPassDescriptor: GPURenderPassDescriptor,
    renderBundle: Iterable<GPURenderBundle>
) {
    const commandEncoder = device.createCommandEncoder()
    // console.time('executeBundles')
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
    // execute bundles, could save over 10X CPU time
    // but won't help with GPU time
    passEncoder.executeBundles(renderBundle)
    passEncoder.end()
    // console.timeEnd('executeBundles')
    // webgpu run in a separate process, all the commands will be executed after submit
    device.queue.submit([commandEncoder.finish()])
}

// total objects
const NUM = 10000
async function run(){
    const canvas = document.querySelector('canvas')
    if (!canvas)
        throw new Error('No Canvas')
    
    const {device, context, format, size} = await initWebGPU(canvas)
    const pipelineObj = await initPipeline(device, format, size)
    // create objects
    let aspect = size.width / size.height
    const scene:any[] = []
    const mvpBuffer = new Float32Array(NUM * 4 * 4)
    for(let i = 0; i < NUM; i++){
        // craete simple object
        const position = {x: Math.random() * 40 - 20, y: Math.random() * 40 - 20, z:  - 50 - Math.random() * 50}
        const rotation = {x: 0, y: 0, z: 0}
        const scale = {x:1, y:1, z:1}
        scene.push({position, rotation, scale})
    }
    // record renderBundle to save CPU encoder time
    let renderBundle: Iterable<GPURenderBundle>
    {
        const passEncoder = device.createRenderBundleEncoder({
            colorFormats: [format],
            depthStencilFormat: 'depth24plus'
        })
        passEncoder.setPipeline(pipelineObj.pipeline)
        // asume we have different objects
        // need to change vertex and group on every draw
        // that requires a lot of cpu time for a large NUM
        console.time('recordBundles')
        for(let i = 0; i< NUM; i++){
            passEncoder.setVertexBuffer(0, pipelineObj.vertexBuffer) 
            passEncoder.setBindGroup(0, pipelineObj.group)
            passEncoder.draw(cube.vertexCount, 1, 0, i)
        }
        console.timeEnd('recordBundles')
        renderBundle = [passEncoder.finish()]
    }
    // start loop
    function frame(){
        // update rotation for each object
        for(let i = 0; i < scene.length - 1; i++){
            const obj = scene[i]
            const now = Date.now() / 1000
            obj.rotation.x = Math.sin(now + i)
            obj.rotation.y = Math.cos(now + i)
            const mvpMatrix = getMvpMatrix(aspect, obj.position, obj.rotation, obj.scale)
            mvpBuffer.set(mvpMatrix, i * 4 * 4)
        }
        // the better way is update buffer in one write after loop
        device.queue.writeBuffer(pipelineObj.mvpBuffer, 0, mvpBuffer)
        const renderPassDescriptor: GPURenderPassDescriptor = {
            colorAttachments: [
                {
                    view: context.getCurrentTexture().createView(),
                    clearValue: { r: 0, g: 0, b: 0, a: 1.0 },
                    loadOp: 'clear',
                    storeOp: 'store'
                }
            ],
            depthStencilAttachment: {
                view: pipelineObj.depthView,
                depthClearValue: 1.0,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
            }
        }
        draw(device, renderPassDescriptor, renderBundle)
        requestAnimationFrame(frame)
    }
    frame()

    // re-configure context on resize
    window.addEventListener('resize', ()=>{
        size.width = canvas.width = canvas.clientWidth * devicePixelRatio
        size.height = canvas.height = canvas.clientHeight * devicePixelRatio
        // don't need to recall context.configure() after v104
        // re-create depth texture
        pipelineObj.depthTexture.destroy()
        pipelineObj.depthTexture = device.createTexture({
            size, format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        })
        pipelineObj.depthView = pipelineObj.depthTexture.createView()
        // update aspect
        aspect = size.width/ size.height
    })
}
run()