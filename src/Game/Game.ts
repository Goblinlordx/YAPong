import Phaser from "phaser"
const paddle = new URL("./sound/paddle.wav", import.meta.url)
const wall = new URL("./sound/wall.wav", import.meta.url)
const score = new URL("./sound/score.wav", import.meta.url)

export class Game extends Phaser.Scene {
  private MAX_V = 1000

  private cursors: any
  private ball: any
  private lpaddle: Phaser.GameObjects.Rectangle
  private rpaddle: Phaser.GameObjects.Rectangle
  private score = {
    left: 0,
    right: 0,
  }

  constructor(name = "game") {
    super(name)
  }
  preload() {
    this.load.audio("paddle-bounce", paddle.toString())
    this.load.audio("wall-bounce", wall.toString())
    this.load.audio("score", score.toString())
  }
  resetBall() {
    this.ball.setX(400)
    this.ball.setY(Math.random() * 440 + 100)
    this.ball.body.setVelocity(
      (Math.floor(Math.random() * 2) ? 1 : -1) *
        200 *
        (Math.random() * 0.7 + 0.8),
      (Math.floor(Math.random() * 2) ? 1 : -1) *
        200 *
        (Math.random() * 0.7 + 0.8)
    )
  }
  create() {
    this.sound.add("paddle-bounce")
    this.sound.add("wall-bounce")
    this.sound.add("score")
    this.ball = this.add.circle(400, 320, 3, 0xff0000, 1)
    this.physics.add.existing(this.ball)

    this.ball.body
      .setMaxSpeed(this.MAX_V)
      .setCollideWorldBounds(true)
      .setBounce(1.1, 1.1)

    this.ball.body.onWorldBounds = true

    this.resetBall()

    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      if (up || down) {
        this.sound.play("wall-bounce")
        return
      }
      this.sound.play("score")
      if (left) {
        this.score.right++
      } else if (right) {
        this.score.left++
      }
      if (
        (Math.abs(this.score.left - this.score.right) >= 2 &&
          this.score.left >= 11) ||
        this.score.right >= 11
      )
        console.log("game over")

      this.resetBall()
    })

    this.lpaddle = this.add.rectangle(145, 200, 5, 30, 0xffffff, 1)
    this.physics.add.existing(this.lpaddle)
    this.lpaddle.body.setImmovable(true)
    this.lpaddle.body.setCollideWorldBounds(true)
    this.physics.add.collider(this.ball, this.lpaddle, () => {
      this.sound.play("paddle-bounce")
    })

    this.rpaddle = this.add.rectangle(645, 200, 5, 30, 0xffffff, 1)
    this.physics.add.existing(this.rpaddle)
    this.rpaddle.body.setImmovable(true)
    this.rpaddle.body.setCollideWorldBounds(true)
    this.physics.add.collider(this.ball, this.rpaddle, () => {
      this.sound.play("paddle-bounce")
    })

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    const bvel = Math.ceil(
      (this.ball.body.velocity.x ** 2 + this.ball.body.velocity.y ** 2) **
        (1 / 2)
    )
    const vinc = 250 + (bvel / this.MAX_V) * (this.MAX_V - 200)

    if (this.cursors?.up?.isDown) {
      this.lpaddle.body.setVelocityY(-vinc)
    } else if (this.cursors?.down?.isDown) {
      this.lpaddle.body.setVelocityY(vinc)
    } else {
      this.lpaddle.body.setVelocityY(0)
    }

    const ry = this.rpaddle.y
    if (ry > this.ball.y + 10) {
      this.rpaddle.body.setVelocityY(
        -vinc / Math.max(1, 50 / Math.abs(this.ball.y - ry))
      )
    } else if (ry < this.ball.y - 10) {
      this.rpaddle.body.setVelocityY(
        vinc / Math.max(1, 50 / Math.abs(this.ball.y - ry))
      )
    } else {
      this.rpaddle.body.setVelocityY(0)
    }

    if (this.bvel > this.MAX_V * 2 || this.ball.body.velocity.x === 0) {
      this.resetBall()
    }
  }
}
