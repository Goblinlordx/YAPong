import { WebFontFile } from "../WebFontFile/WebFontFile"

export class Intro extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key

  constructor(name = "intro") {
    super(name)
  }
  preload() {
    this.load.addFile(new WebFontFile(this.load, "Press Start 2P"))
  }

  create() {
    this.game.scene.start("global-keys")
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )
    var style = {
      font: "bold 32px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle",
    }

    this.add
      .text(400, 100, "Yet Another PONG", {
        fontSize: "50px",
        align: "center",
      })
      .setOrigin(0.5)
    this.add.text(100, 220, "F: Fullscreen", {
      fontSize: "20px",
    })
    this.add.text(100, 250, "up/down: Move left paddle", {
      fontSize: "20px",
    })
    this.add.text(400, 350, "Press SPACE to start", {
      fontSize: "40px",
    }).setOrigin(.5)
  }
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.startKey)) {
      this.game.scene.start("game")
      this.game.scene.stop("intro")
    }
  }
}
