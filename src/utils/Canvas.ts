import { Application, Graphics, ColorSource, Sprite, SpriteSource, FederatedEventTarget,FederatedPointerEvent } from "pixi.js";

import Select from "./Select"
class Canvas {
    #app
    stage
    touchBegin: { x: number, y: number } = { x: 0, y: 0 } //点击或者触摸的起始点
    touch: { x: number, y: number } = { x: 0, y: 0 } //点击或者触摸的移动点
    constructor() {
        this.#app = new Application({
            width: window.innerWidth,
            height: window.innerHeight,
            background: "black",
            eventMode: "dynamic"
        })

        document.body.appendChild(this.#app.view as HTMLCanvasElement)

        this.stage = this.#app.stage
        // 初始化Select
        // 给body添加拖入文件事件
        document.body.addEventListener("drop", (event) => {
            event.preventDefault()
            const file = event.dataTransfer?.files[0]

            if (file) {
                // 检查目标文件类型
                const fileName = file.name
                if (!/(\.svg)|(\.png)|(\.jpg)|(\.jpeg)$/.test(fileName)) {
                    console.log("拖入的文件不是有效的可支持的图片文件")
                    return
                }
                try {
                    const fileReader = new FileReader()
                    fileReader.readAsDataURL(file)
                    fileReader.onload = () => this.drawImage(event.clientX, event.clientY, fileReader.result as SpriteSource)
                    fileReader.onerror = () => { throw new Error("文件读取失败") }
                } catch (e) {
                    alert("图片读取失败")
                    console.error(e)
                }

            }
        })
        // 取消跳转操作
        document.body.addEventListener("dragover", (event) => event.preventDefault())

        // 给stage添加事件
        const mask = new Graphics()
        mask.beginFill("#ffffff")
        mask.drawRect(0, 0, this.#app.renderer.width, this.#app.renderer.height)
        mask.alpha = 0
        mask.endFill()
        this.stage.addChild(mask)

        // 图片拖动操作
        this.stage.addListener("mousemove", (event) => {
            // if(!Select.selected) return
            const [x, y] = [event.clientX, event.clientY]
            const diffX = x-this.touch.x
            const diffY = y-this.touch.y
            if (Select.pressing && Select.selectType === "move") {
                // 计算点击的位置
                Select.setPosition(
                    Select.x + diffX,
                    Select.y + diffY
                )
            }
            // 设置图片x,y和width,height
            else if(Select.selectType === "left top"){
                Select.target.width = Select.width - diffX
                Select.target.height = Select.height - diffY
                Select.setPosition(
                    Select.x + diffX,
                    Select.y + diffY
                )
                Select.painting()
            }
            else if(Select.selectType === "top"){
                Select.target.height = Select.height - diffY
                Select.setPosition(
                    Select.x ,
                    Select.y + diffY
                )
                Select.painting()
            }
            else if(Select.selectType === "right top"){
                Select.target.width = Select.width + diffX
                Select.target.height = Select.height - diffY
                Select.setPosition(
                    Select.x ,
                    Select.y + diffY
                )
                Select.painting()
            }
            else if(Select.selectType === "left"){
                Select.target.width = Select.width - diffX
                Select.setPosition(
                    Select.x + diffX,
                    Select.y
                )
                Select.painting()
            }
            else if(Select.selectType === "right"){
                Select.target.width = Select.width + diffX
                Select.painting()
            }
            else if(Select.selectType === "left bottom"){
                Select.target.width = Select.width - diffX
                Select.target.height = Select.height + diffY
                Select.setPosition(
                    Select.x + diffX,
                    Select.y
                )
                Select.painting()
            }
            else if(Select.selectType === "bottom"){
                Select.target.height = Select.height + diffY
                Select.painting()
            }
            else if(Select.selectType === "right bottom"){
                Select.target.width = Select.width + diffX
                Select.target.height = Select.height + diffY
                Select.painting()
            }
            this.touch = { x, y }
        })

        // 给场景添加鼠标按下事件
        this.stage.addListener("pointerdown", (event)  => {
            const [x, y] = [event.clientX, event.clientY]
            this.touchBegin = { x, y }
            Select.selectType = (event.target as any).type //获取一瞬间点击对象的值
            // 判断是否点击在图片范围内，但是不能是周围8个小方块上
            if (Select.selected && Select.x <= x && Select.x + Select.width >= x && Select.y <= y && Select.y + Select.height >= y && Select.selectType === undefined) {
                Select.pressing = true
                Select.pressStartPosition = { x: Select.x, y: Select.y }
                Select.selectType = "move"
            }
        })

        // 给场景添加鼠标弹起事件
        this.stage.addListener("mouseup", (event) => {
            Select.pressing = false
            this.touch = { x: 0, y: 0 }
            // 清空selectType保存的状态
            Select.selectType = undefined
        })
    }

    // 绘制方块
    drawReact(x: number, y: number, width: number, height: number, color: ColorSource = "#ffffff") {
        const rect = this.stage.addChild(new Graphics())
        rect.beginFill(color)
        rect.drawRect(x, y, width, height)
        rect.endFill()
        this.#addClickListener(rect)
        return rect
    }

    // 绘制图像
    drawImage(x: number, y: number, imageSource: SpriteSource) {
        // 拿到的dataurl通过创建img节点来获取相应的元数据
        // const imageElement = new Image()
        // imageElement.src = imageSource as string
        

        // SpriteSource 可以穿个dataurl,这样pixi解析不会出问题
        const image = this.stage.addChild(Sprite.from(imageSource))
        image.position.set(x, y)
        
        this.#addClickListener(image)
        return image
    }

    #addClickListener(target: any) {
        target.addEventListener("click", () => Select.attach(this.stage, target))
    }

}

export default Canvas
