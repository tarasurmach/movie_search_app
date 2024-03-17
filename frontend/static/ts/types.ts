export default interface View{
    setTitle(title?:string):void,
    renderUI(data:any[]):HTMLDivElement
}
