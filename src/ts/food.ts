export default class Food {
  element: HTMLElement

  constructor (private step: number = 10) {
    this.element = document.getElementById('food') as HTMLElement
    this.step = step
  }

  get X(): number {
    return this.element.offsetLeft
  }

  set X(number: number) {
    this.element.style.left = number + 'px'
  }

  get Y(): number {
    return this.element.offsetTop
  }

  set Y(number: number) {
    this.element.style.top = number + 'px'
  }

  randomPosition(snakePositionArr: [number, number][]):[number, number] {
    const newX = Math.round(Math.random()*36) * 10
    const newY = Math.round(Math.random()*39) * 10
    const flag = snakePositionArr.some(([x, y]) => x === newX && y === newY)
    // 判断是否包含不包含则
    if (flag) return this.randomPosition(snakePositionArr)
    return [Math.round(Math.random()*36) * 10, Math.round(Math.random()*39) * 10]
  }

  // 先roll出与蛇身不重复的位置 再将roll出的值设置给设置给新食物坐标
  setPositionFood(snakePositionArr: [number, number][]):void {
    const [x, y] = this.randomPosition(snakePositionArr)
    this.X = x
    this.Y = y
  }
}