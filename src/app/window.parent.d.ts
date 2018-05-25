interface Window {
    receiveMessage(param1:string,param2?:string):boolean
    postMessage(params:string,domain:string):void
}