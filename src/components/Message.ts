export interface MessageOption{
    fontSize?:string,

}
const originOptions:MessageOption = {
    fontSize:"12px"
}

class Message{
    static #root:HTMLDivElement | null = null
    static success(message:string,options?:MessageOption){
        const finalOptions:MessageOption = {
            ...originOptions,
            ...options,
        }

        this.#createRoot()
        const div = this.#createItem()
        div.className= "message-item message-item-success"
        div.innerHTML= message

        // 设置样式
        div.style.fontSize = finalOptions.fontSize!

        // 设置动画
        div.animate([
            {opacity:0.3,translate:"0 -50px"},
            {opacity:1,translate:"0 0"},
        ],{
            duration:300,
            fill:"forwards",
            easing:"ease-in"
        })

        this.#root?.appendChild(div)
    }

    // 创建所有Message所在的根节点
    static #createRoot(){
        // 如果根节点没有指定的对象，那么就创建它
        if(this.#root === null) {
            this.#root = document.createElement("div")
            this.#root.id = "_message"
            this.#root.className = "message-group"
            document.body.appendChild(this.#root)
        }
    }

    // 销毁根节点
    static #destoryRoot(){
        if(this.#root === null) return
        document.body.removeChild(this.#root)
    }

    // 创建base Item
    static #createItem() : HTMLDivElement{
        const div = document.createElement("div")
        return div
    }

    // 销毁item
    static #destoryItem():void{

    }


}

export default Message