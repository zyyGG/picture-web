import "./style.css"
import Canvas from "./utils/Canvas"
import Select from "./utils/Select"

const canvas = new Canvas()
const root = document.getElementById("app")
const tool = document.createElement("div")
const foldElement = createFoldElement()
const menuElement = createMenuElement()

const isFold ={
  get:()=>{return foldElement.className === "tool-state-fold"},
  set:(value:boolean)=>{
    if(value){
      tool.innerHTML=""
      tool.appendChild(foldElement)
    }else{
      tool.innerHTML=""
      tool.appendChild(menuElement)
    }
  }
}
tool.className = "tool"
root?.appendChild(tool)
isFold.set(false)

function createFoldElement(){
  const dom = document.createElement("div")
  dom.className = "tool-state-fold"
  dom.addEventListener("click",()=>isFold.set(!isFold.get()))
  return dom
}

function createMenuElement(){
  const dom = document.createElement("div")
  dom.className = "tool-state-menu"

  // x轴管理节点
  const menu1 = document.createElement("div")
  menu1.className = "menu"
  const labelx = document.createElement("label")
  labelx.innerText = "x:"
  labelx.className = "label"
  menu1.appendChild(labelx)
  const inputx = document.createElement("input")
  inputx.className = "primary"
  inputx.type = "number"
  inputx.id="tool-input-x"
  inputx.value = String(0)
  inputx.addEventListener("change",(event)=>{
    Select.selected ? Select.setPosition(Number(event.target as HTMLInputElement),Select.y) : inputx.value = String(0)
  })
  menu1.appendChild(inputx)
  dom.appendChild(menu1)

  // y轴管理节点
  const menu2 = document.createElement("div")
  menu2.className = "menu"
  const labely = document.createElement("label")
  labely.innerText = "y:"
  labely.className = "label"
  menu2.appendChild(labely)
  const inputy = document.createElement("input")
  inputy.className = "primary"
  inputy.type = "number"
  inputy.id="tool-input-y"
  inputy.value = String(0)
  inputy.addEventListener("change",(event)=>{
    Select.selected ? Select.setPosition(Select.x,Number(event.target as HTMLInputElement)) : inputy.value = String(0)
  })
  menu2.appendChild(inputy)
  dom.appendChild(menu2)

  // width管理节点
  const menu3 = document.createElement("div")
  menu3.className = "menu"
  const labelw = document.createElement("label")
  labelw.innerText = "w:"
  labelw.className = "label"
  menu3.appendChild(labelw)
  const inputw = document.createElement("input")
  inputw.className = "primary"
  inputw.type = "number"
  inputw.id="tool-input-w"
  inputw.value = String(0)
  inputw.addEventListener("change",(event)=>{
    Select.selected ? Select.width = Number(event.target as HTMLInputElement) : inputw.value = String(0)
  })
  menu3.appendChild(inputw)
  dom.appendChild(menu3)

  // height管理节点
  const menu4 = document.createElement("div")
  menu4.className = "menu"
  const labelh = document.createElement("label")
  labelh.innerText = "h:"
  labelh.className = "label"
  menu4.appendChild(labelh)
  const inputh = document.createElement("input")
  inputh.className = "primary"
  inputh.type = "number"
  inputh.id="tool-input-h"
  inputh.value = String(0)
  inputh.addEventListener("change",(event)=>{
    Select.selected ? Select.width = Number(event.target as HTMLInputElement) : inputh.value = String(0)
  })
  menu4.appendChild(inputh)
  dom.appendChild(menu4)

  return dom
}

