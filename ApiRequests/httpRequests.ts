
export enum ReqestType {
    GET="GET",
    POST="POST",
    PUT="PUT",
    DELETE="DELETE"
}
export default class HttpRequest {
    constructor(public url:string,public body:any,public type:ReqestType){}

    private async send():Promise<any> {
        const req = await fetch(this.url,{
            method:this.type,
        })
        
    }
}