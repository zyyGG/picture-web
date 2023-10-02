import "./style.css"
import Canvas from "./utils/Canvas"
import Message from "./components/Message"

const canvas = new Canvas()


function create(){
  setTimeout(() => {
    Message.success("Yes")
    create()
  }, 1000);
}

function draw(){
  // rect.x ++
  // if(!selectBox.destroyed) selectBox.x++
  // Select.selected && Select.setPosition(Select.x+1,Select.y)
  requestAnimationFrame(draw)
}

draw()

