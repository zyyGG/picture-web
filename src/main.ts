import "./style.css"
import Canvas from "./utils/Canvas"
import Message from "./components/Message"

const canvas = new Canvas()


Message.success("success")
Message.error("error")
Message.warn("warn")
console.log(Message.prototype)

Message.success("success",{
  fontSize:"16px"
})

function draw(){
  // rect.x ++
  // if(!selectBox.destroyed) selectBox.x++
  // Select.selected && Select.setPosition(Select.x+1,Select.y)
  requestAnimationFrame(draw)
}

draw()

