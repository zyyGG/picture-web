import type { ColorSource, FederatedPointerEvent} from "pixi.js"
export interface pointerGroupConfigIF{
    type:"left top" | "top" | "right top" | "left" | "center" | "right" | "left bottom" | "bottom" | "right bottom"
    // x:number,
    // y:number,
    width:number,
    height:number,
    fillColor?:ColorSource,
    cursor:string, //鼠标hover的种类
    pointerMoveEvent?:(event:FederatedPointerEvent)=>void, //鼠标点击的时候附加的事件
}