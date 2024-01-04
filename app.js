const canvas=document.getElementById("canvas")
const ctx=canvas.getContext("2d")
let canvasSize=600
canvas.width=canvasSize
canvas.height=canvasSize
let vx=20;
let vy=0;
let score=0
let gameOver=new Audio("./gameover.wav")
const appleSound=new Audio("./apple.wav")
let snake =[
    {
        x:60,
        y:300,
    },
    {
        x: 40,
        y: 300,
    },
    {
        x: 20,
        y:300,
    },
]
let apple={
    x:80,
    y:160
}
const drawBoard=()=>{
    ctx.fillStyle=("#000")
    ctx.fillStyle="#feca57"
    ctx.fillRect(0,0,canvasSize,canvasSize)
}
const drawScore=()=>{
    ctx.font = "25px Arial"
    ctx.fillText(`Score: ${score}`, canvasSize-130, 40)
}
const drawSnake=()=>{
    ctx.fillStyle=("#0abde3")
    snake.map((s)=>{
        ctx.fillRect(s.x,s.y,20,20)
    })
}
const drawApple = () => {
    ctx.fillStyle="#574b90"
    ctx.fillRect(apple.x,apple.y,20,20)
}
const generatorNewApple=()=>{
    apple.x = Math.floor((Math.random() * canvasSize) / 20) * 20
    apple.y = Math.floor((Math.random() * canvasSize) / 20) * 20
}
const moveSnake=()=>{
    const head={x: snake[0].x + vx, y: snake[0].y + vy}
    if(head.x>canvasSize){
        head.x=0
    }
    if(head.x<0){
        head.x=canvasSize
    }
    if (head.y>canvasSize){
        head.y=0
    }
    if (head.y<0){
        head.y=canvasSize
    }
    if(head.x===apple.x && head.y===apple.y){
        appleSound.play()
        snake.push(apple)
        generatorNewApple()
        score++
    }
    for (let i=1; i<snake.length; i++){
        if(head.x===snake[i].x && head.y===snake[i].y){
            gameOver.play()
            clearInterval(game)
        }
    }
    snake.unshift(head)
    snake.pop()
}
document.addEventListener("keydown",(e)=>{
    console.log(e)
    switch(e.keyCode){
        case 37:
            if(vx === 20){
                return
            }
            vy=0
            vx=-20
            break;
        case 39:
            if (vx === -20) {
                return
            }
            vy=0
            vx=20
            break;
        case 38:
            if (vy === 20) {
                return
            }
            vx=0
            vy=-20
            break;
        case 40:
            if (vy === -20) {
                return
            }
            vx=0
            vy=20
            break;

    }
})

let game = setInterval(() => {
    drawBoard()
    drawApple()
    moveSnake()
    drawSnake()
    drawScore()
}, 1000/12);