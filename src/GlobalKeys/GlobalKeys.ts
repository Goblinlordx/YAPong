export class GlobalKeys extends Phaser.Scene {
  private fullscreenKey: Phaser.Input.Keyboard.Key
  constructor(name = "global-keys") {
    super(name)
  }
  create() {
    this.fullscreenKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.F
    )
  }
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.fullscreenKey))
      this.game.scale.toggleFullscreen()
  }
}
