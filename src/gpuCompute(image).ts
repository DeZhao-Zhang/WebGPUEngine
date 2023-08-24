import * as buffer from "buffer";
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
}