export class GameOver extends Phaser.Scene {
  private restartKey: Phaser.Input.Keyboard.Key
  constructor(key = "game-over") {
    super(key)
  }
  create() {
    console.log('here')
    this.restartKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )

    this.add.text(400, 100, "GAME OVER", {
      fontFamily: "Prompt",
      fontSize: "80px",
    }).setOrigin(0.5)
    this.add.text(400, 300, "Press SPACE to restart", {
      fontFamily: "Prompt",
      fontSize: "20px",
    }).setOrigin(0.5)
  }
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
      this.game.scene.stop("game-over")
      this.game.scene.stop("game")
      this.game.scene.start("game")
    }
  }
}
