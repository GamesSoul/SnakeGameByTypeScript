export default class ScoreBoard {
  scoreElement: HTMLElement
  levelElement: HTMLElement

  constructor (private maxScore: number = 10, private maxLevel: number = 10, private step:number = 1) {
    this.scoreElement = document.getElementById('score') as HTMLElement
    this.levelElement = document.getElementById('level') as HTMLElement
    this.maxScore = maxScore
    this.maxLevel = maxLevel

    // 初始化分数面板
    this.init()
  }
  init():void {
    this.scoreElement.innerText = 0 + ''
    this.levelElement.innerText = 1 + ''
  }

  get score():number {
    return parseInt(this.scoreElement.innerText)
  }

  get level():number {
    return parseInt(this.levelElement.innerText)
  }

  addScore():void {
    if (this.score % this.maxScore === 0 && this.score !== 0) this.addLevel()
    this.scoreElement.innerText = (this.score + this.step) + ''
  }

  addLevel():void {
    if (this.level < this.maxLevel) this.levelElement.innerText = (this.level + this.step) + ''
  }

}