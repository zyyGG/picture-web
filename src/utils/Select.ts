import { Container, Graphics } from "pixi.js"
import type { FederatedEventTarget, Sprite } from "pixi.js"
import type { pointerGroupConfigIF } from "../../../picture-web2/src/type"
const pointerGroupConfig: pointerGroupConfigIF[] = [
    //左上
    { 
        type: "left top", 
        width: 10, 
        height: 10, 
        fillColor: "white",
        cursor:"nwse-resize",
    }, 
    //上
    { 
        type: "top",
        width: 10, 
        height: 10, 
        fillColor: "white",
        cursor:"ns-resize",
        pointerMoveEvent:(event)=>{
            // if(event.pressure!==0)
        },
    }, 
    //右上
    { 
        type: "right top", 
        // x: x + width - 5, 
        // y: y - 5, 
        width: 10, 
        height: 10, 
        fillColor: "white",
        cursor:"nesw-resize",
        pointerMoveEvent:(event)=>{
            console.log("click")
        },
    }, 
    //左
    { 
        type: "left", 
        // x: x - 5, 
        // y: y + height / 2 - 5, 
        width: 10, 
        height: 10, 
        fillColor: "white",
        cursor:"ew-resize",
        pointerMoveEvent:(event)=>{
            console.log("click")
        },
    }, 
    // {type:"center", x:x+width/2-5, y:y+height/2-5, width:10, height:10, fillColor:"white"}, //中间
    //右
    { 
        type: "right", 
        // x: x + width - 5, 
        // y: y + height / 2 - 5, 
        width: 10, 
        height: 10, 
        fillColor: "white",
        cursor:"ew-resize",
        pointerMoveEvent:(event)=>{
            console.log("click")
        },
    }, 
    //左下
    { 
        type: "left bottom", 
        // x: x - 5, y: 
        // y + height - 5, 
        width: 10, 
        height: 10, 
        fillColor: "white",
        cursor:"nesw-resize", 
        pointerMoveEvent:(event)=>{
            console.log("click")
        },
    }, 
    //下
    { 
        type: "bottom", 
        // x: x + width / 2 - 5, 
        // y: y + height - 5, 
        width: 10, 
        height: 10, 
        fillColor: "white",
        cursor:"ns-resize", 
        pointerMoveEvent:(event)=>{
            console.log("click")
        },
    }, 
    //右下
    { 
        type: "right bottom", 
        // x: x + width - 5, 
        // y: y + height - 5, 
        width: 10, 
        height: 10, 
        fillColor: "white",
        cursor:"nwse-resize", 
        pointerMoveEvent:(event)=>{
            console.log("click")
        },
    }, 
]
export default class Select {
    static selectBox: Container | undefined
    static target: any | undefined
    static pressing:boolean //是否处于按压并且选中的状态
    static pressStartPosition:{x:number,y:number}={x:0,y:0}
    static stage :Container
    static get x():number { return this.selected ? Select.target.x : 0 } //坐标x
    static get y():number { return this.selected ? Select.target.y: 0 } //坐标y
    static get width():number{return this.selected ?   Select.target.width: 0}
    static get height():number{return this.selected ?  Select.target.height: 0}
    static set width(value:number){
        if(Select.selected){
            Select.target.width = value
            Select.selectBox!.width = value
            const toolInputWElement:HTMLInputElement | null = document.getElementById("tool-input-w") as any
            toolInputWElement && (toolInputWElement.value = String(value))
        }
    }
    static set height(value:number){
        if(Select.selected){
            Select.target.height = value
            Select.selectBox!.height = value
            const toolInputHElement:HTMLInputElement | null = document.getElementById("tool-input-h") as any
            toolInputHElement && (toolInputHElement.value = String(value))
        }
    }
    static get selected():boolean { return Select.selectBox === undefined || Select.selectBox.destroyed ? false : true } //是否处于选中状态
    static selectType:pointerGroupConfigIF["type"] | "move" | undefined //获取当前正在操作对象的type,主要用于图片的长宽操作
    
    /**
     * 将目标附加至场景中
     * @param stage 需要添加的场景
     * @param target 被附加的对象
     * @returns 
     */
    static attach(stage: Container, target: Sprite | Graphics | any) {
        if (target.renderId === undefined) return false
        if (Select.selectBox && Select.target === target && (Select.pressStartPosition.x === Select.x && Select.pressStartPosition.y === Select.y)) return Select.destory()
        if (Select.selectBox && !Select.selectBox.destroyed) Select.destory()
        
        Select.target = target
        Select.target.cursor="move"
        this.stage = stage
        this.painting()
        return true
    }

    static painting(){
        Select.selectBox?.destroy()

        Select.selectBox = new Container()
        Select.selectBox.position.set(0,0)
        // 边框
        const border = new Graphics()
        border.lineStyle({
            color:"white",
            width:1,
        })
        border.moveTo(0,0)
        border.lineTo(Select.target.width,0)
        border.lineTo(Select.target.width,Select.target.height)
        border.lineTo(0,Select.target.height)
        border.lineTo(0,0)
        Select.selectBox.addChild(border)
        // 边角点
        pointerGroupConfig.forEach(item=>{
            const pointer = new Graphics()
            pointer.beginFill(item.fillColor)
            switch(item.type){
                case "left top": pointer.drawRect(0-item.width / 2, 0-item.height / 2, item.width,item.height);break;
                case "top": pointer.drawRect(0-item.width / 2 + Select.target.width / 2, 0-item.height / 2, item.width,item.height);break;
                case "right top": pointer.drawRect(0-item.width / 2 + Select.target.width, 0-item.height / 2, item.width,item.height);break;
                case "left": pointer.drawRect(0-item.width / 2, 0-item.height / 2 + Select.target.height / 2, item.width,item.height);break;
                case "right": pointer.drawRect(0-item.width / 2 + Select.target.width, 0-item.height / 2 + Select.target.height / 2, item.width,item.height);break;
                case "left bottom": pointer.drawRect(0-item.width / 2, 0-item.height / 2 + Select.target.height, item.width,item.height);break;
                case "bottom": pointer.drawRect(0-item.width / 2 + Select.target.width / 2, 0-item.height / 2 + Select.target.height, item.width,item.height);break;
                case "right bottom": pointer.drawRect(0-item.width / 2 + Select.target.width, 0-item.height / 2 + Select.target.height, item.width,item.height);break;
            }
            pointer.cursor = item.cursor
            // pointer.addListener("pointermove",item.pointerMoveEvent.bind(pointer))
            Object.defineProperty(pointer,"type",{
                enumerable:true,
                writable:true,
                value:item.type
            })
            pointer.endFill()
            Select.selectBox?.addChild(pointer)
        })
        this.stage.addChild(Select.selectBox!)
        Select.selectBox.position.set(Select.target.x, Select.target.y)

        const toolInputWElement:HTMLInputElement | null = document.getElementById("tool-input-w") as any
        toolInputWElement && (toolInputWElement.value = String(Select.target.width))
        const toolInputHElement:HTMLInputElement | null = document.getElementById("tool-input-h") as any
        toolInputHElement && (toolInputHElement.value = String(Select.target.height))
    }

    // 销毁选中框,同时销毁附属的目标,和部分事件
    static destory() {
        if (Select.selectBox) Select.selectBox.destroy()
        if (Select.target) {
            Select.target.cursor=undefined
            // Select.target.removeEventListener("mousemove",this.#move)
            Select.target = undefined
        }
    }

    /**
     * 设置边框的位置，同时也会修改被附加对象
     * @param x 新坐标
     * @param y
     */
    static setPosition(x: number, y: number) {
        if (!Select.selected) return false
        Select.target.position.set(x, y)
        Select.selectBox?.position.set(x, y)

        const toolInputXElement:HTMLInputElement | null = document.getElementById("tool-input-x") as any
        const toolInputYElement:HTMLInputElement | null = document.getElementById("tool-input-y") as any

        toolInputXElement && (toolInputXElement.value = String(x))
        toolInputYElement && (toolInputYElement.value = String(y))
        
        // toolInputXElement?.
        return true
    }
}