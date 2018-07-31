interface Window {
    receiveMessage(args:string):boolean
    postMessage(params:string,domain:string):void
}