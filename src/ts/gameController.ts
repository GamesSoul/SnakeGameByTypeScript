import Food from '@/ts/food'
import ScoreBoard from '@/ts/scoreBoard'
import Snake from '@/ts/snake'

type direction = 'L' | 'R' | 'T' | 'D'

export default class GameController {
  food: Food
  scoreBoard: ScoreBoard
  snake: Snake
  direction: direction
  gameTimer: NodeJS.Timeout | null
  controlGameElement: HTMLElement
  startElement: HTMLElement
  restartElement: HTMLElement
  live: boolean

  constructor (private stepTimer: number = 1000) {
    this.controlGameElement = document.getElementById('controlGame') as HTMLElement
    this.startElement = document.getElementById('start') as HTMLElement
    this.restartElement = document.getElementById('restart') as HTMLElement
    this.food = new Food()
    this.scoreBoard = new ScoreBoard()
    this.snake = new Snake()
    this.direction = 'R'
    this.gameTimer = null
    this.stepTimer = stepTimer
    this.live = true

    this.init()
  }


  init():void {
    // 为键盘注册按键事件
    document.addEventListener('keydown', this.watchKeyBoardPress.bind(this))
  }

  // 监听键盘按键
  watchKeyBoardPress(event: KeyboardEvent):void {
    switch (event.key) {
      case 'ArrowLeft':
      case 'Left':
        if (this.direction !== 'R') this.direction = 'L'
        break;
      case 'ArrowRight':
      case 'Right':
        if (this.direction !== 'L') this.direction = 'R'
        break;
      case 'ArrowUp':
      case 'Up':
        if (this.direction !== 'D') this.direction = 'T'
        break;
      case 'ArrowDown':
      case 'Down':
        if (this.direction !== 'T') this.direction = 'D'
        break;
      case 'Enter':
        this.live ? this.beginGame() : this.restartGame()
        this.controlGameElement.style.display = 'none'
        this.startElement.style.display = 'none'
        break;
      default:
        break;
    }
  }

  // 开始游戏
  beginGame():void {
    this.gameExecuteOptions()
  }

  // 重新开始游戏
  restartGame():void {
    location.reload()
  }

  // 定时器中每一步需要执行的逻辑
  gameExecuteOptions():void {
    // 计算下一步要走到哪个位置
    const nextMove:[number, number] = [...this.snake.bodies[0]]
    switch (this.direction) {
      case 'L':
        nextMove[0] -= 10
        break;
      case 'R':
        nextMove[0] += 10
        break;
      case 'T':
        nextMove[1] -= 10
        break;
      case 'D':
        nextMove[1] += 10
        break;
      default:
        break;
    }
    // 判断是否下一步与食物的位置重叠 重叠的话则调用吃食物的方法 分数也upupup
    if (this.food.X === nextMove[0] && this.food.Y === nextMove[1]) {
      this.snake.eatFood(nextMove)
      this.scoreBoard.addScore()
      // 先roll出与蛇身不重复的位置 再将roll出的值设置给设置给新食物坐标
      this.food.setPositionFood(this.snake.bodies)
    } else {
      try {
        this.snake.moveSnake(nextMove)
      } catch (error) {
        console.log(error)
        clearTimeout(Number(this.gameTimer))
        this.controlGameElement.style.display = 'flex'
        this.restartElement.style.display = 'block'
        this.live = false
      }
    }

    if (this.live) {
      setTimeout(() => {
        this.gameExecuteOptions()
      }, this.stepTimer -this.scoreBoard.level * this.stepTimer * .1);
    }
  }
}