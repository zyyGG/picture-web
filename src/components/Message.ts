export interface MessageOption{
    /**文字大小 */
    fontSize?:string,
    /**展示时间 ms */
    showTime?:number,

}

// 基本设置
const originOptions:MessageOption = {
    fontSize:"12px",
    showTime:3000,
}

// 动画的相关设置
const animateOption:KeyframeAnimationOptions = {
    duration:300,
    fill:"forwards",
    easing:"ease-in"
}

// 显示的动画s
const showAnimate:Keyframe[] = [
    {opacity:0.3,translate:"0 -50px"},
    {opacity:1,translate:"0 0"},
]

// 消失的动画
const removeAnimate:Keyframe[] = [
    {opacity:1,translate:"0 0"},
    {opacity:0.3,translate:"0 -50px"},
]
class Message{
    static #root:HTMLDivElement | null = null
    /**根节点是否有子节点 */
    static get #rootNoChldren(){return this.#root?.children.length === 0} 
    /**
     * 成功的文本显示
     * @param message 需要显示的文本信息
     * @param options 设置
     */
    static success(message:string,options?:MessageOption){
        const finalOptions:MessageOption = this.#getOptions(options)
        this.#createRoot()
        const div = this.#createItem()
        div.className= "message-item message-item-success"
        div.innerHTML= message

        // 设置样式
        div.style.fontSize = finalOptions.fontSize!
        this.#createAnimate(div,finalOptions)// 设置动画
        this.#root?.appendChild(div) //为根节点增加创建的节点
    }

    /**
     * 失败的文本显示
     * @param message 需要显示的文本信息
     * @param options 设置
     */
    static error(message:string,options?:MessageOption){
        const finalOptions:MessageOption = this.#getOptions(options)
        this.#createRoot()
        const div = this.#createItem()
        div.className= "message-item message-item-error"
        div.innerHTML= message

        // 设置样式
        div.style.fontSize = finalOptions.fontSize!
        this.#createAnimate(div,finalOptions)// 设置动画
        this.#root?.appendChild(div) //为根节点增加创建的节点
    }

    /**
     * 警告的文本显示
     * @param message 需要显示的文本信息
     * @param options 设置
     */
    static warn(message:string,options?:MessageOption){
        const finalOptions:MessageOption = this.#getOptions(options)
        this.#createRoot()
        const div = this.#createItem()
        div.className= "message-item message-item-warn"
        div.innerHTML= message

        // 设置样式
        div.style.fontSize = finalOptions.fontSize!
        this.#createAnimate(div,finalOptions)// 设置动画
        this.#root?.appendChild(div) //为根节点增加创建的节点
    }
    
    // 获取处理后的options
    static #getOptions(options:MessageOption | undefined){
        return {
            ...originOptions,
            ...options,
        }
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

    // 为指定节点添加动画
    static #createAnimate(div:HTMLDivElement,options:MessageOption){
        div.animate(showAnimate,animateOption).finished.then(()=>{
            setTimeout(() => {
                div.animate(removeAnimate,animateOption).finished.then(()=>this.#destoryItem(div))
            }, options.showTime);
        })
    }

    // 销毁item
    static #destoryItem(div:HTMLDivElement):void{
        this.#root?.removeChild(div)
        this.#rootNoChldren === true && this.#destoryRoot()
    }
}

export default Message