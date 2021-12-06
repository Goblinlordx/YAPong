import Phaser from "phaser"

export class Game extends Phaser.Scene {
  private MAX_V = 1000

  private cursors: any
  private ball: any
  private lpaddle: Phaser.GameObjects.Rectangle
  private rpaddle: Phaser.GameObjects.Rectangle
  constructor(name = "game") {
    super(name)
  }
  create() {
    this.ball = this.add.circle(400, 320, 10, 0xff0000, 1)
    this.physics.add.existing(this.ball)

    this.ball.body
      .setVelocity(-200, 10)
      .setMaxSpeed(this.MAX_V)
      .setCollideWorldBounds(true)
      .setBounce(1.1, 1.1)

    this.lpaddle = this.add.rectangle(50, 200, 20, 100, 0xffffff, 1)
    this.physics.add.existing(this.lpaddle)
    this.lpaddle.body.setImmovable(true)
    this.lpaddle.body.setCollideWorldBounds(true)
    this.physics.add.collider(this.ball, this.lpaddle)

    this.rpaddle = this.add.rectangle(760, 200, 20, 100, 0xffffff, 1)
    this.physics.add.existing(this.rpaddle)
    this.rpaddle.body.setImmovable(true)
    this.rpaddle.body.setCollideWorldBounds(true)
    this.physics.add.collider(this.ball, this.rpaddle)
    console.log(this.ball.body)

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  resetBall() {
    this.ball.setX(200)
    this.ball.setY(200)
    this.ball.body.setVelocity(-200, 10)
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
