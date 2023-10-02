import "./style.css"
import Canvas from "./utils/Canvas"
import Select from "./utils/Select"

const canvas = new Canvas()




function draw(){
  // rect.x ++
  // if(!selectBox.destroyed) selectBox.x++
  // Select.selected && Select.setPosition(Select.x+1,Select.y)
  requestAnimationFrame(draw)
}

draw()

