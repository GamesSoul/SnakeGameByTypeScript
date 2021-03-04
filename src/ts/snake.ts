type moveArr = [number, number][]

export default class Snake {
  snakeElement: HTMLElement
  bodiesElement: HTMLCollection
  bodies: moveArr
  maxWidth = 360
  maxHeight = 390

  constructor () {
    this.snakeElement = document.getElementById('snake-box') as HTMLElement
    this.bodiesElement = document.getElementsByClassName('snake-body') as HTMLCollection

    this.bodies = [
      [20, 0],
      [10, 0],
      [0, 0]
    ]
    this.init()
  }

  init():void {
    for (let i:number = this.bodies.length - 1; i >= 0; i--) {
      const item = this.bodies[i]
      const element = this.bodiesElement[i] as HTMLElement
      element.style.left = item[0] + 'px'
      element.style.top = item[1] + 'px'
    }
  }

  moveSnake([x, y]: [number, number]):void {
    // 判断是否出界
    if (x > this.maxWidth || x < 0 || y > this.maxHeight || y < 0) {
      throw new Error('outArea');
    } else {
      /**
       * 未出界就移动snake
       * 第一个是走下一步  其他的重复前一个格子的位置就行了
       */
      this.bodies?.pop()
      this.bodies?.unshift([x, y])
      // 执行snake移动dom操作
      for (let i:number = this.bodies.length - 1; i >= 0; i--) {
        const item = this.bodies[i]
        const element = this.bodiesElement[i] as HTMLElement
        element.style.left = item[0] + 'px'
        element.style.top = item[1] + 'px'
        // 判断蛇头是否吃到身体 不包括蛇头
        if (i === 0) {
          if (this.bodies.some((snakeItem, snakeIndex) => snakeIndex !== 0 && snakeItem[0] === item[0] && snakeItem[1] === item[1])) {
            console.log(this.bodies)
            throw new Error('eatSnakeBody');
          }
        }
      }
    }
  }

  eatFood([x, y]: [number, number]):void {
    this.bodies.unshift([x, y])
    const newBody = document.createElement('div')
    newBody.className = 'snake-body'
    newBody.style.left = x + 'px'
    newBody.style.top = y + 'px'
    this.snakeElement.appendChild(newBody)
  }
}