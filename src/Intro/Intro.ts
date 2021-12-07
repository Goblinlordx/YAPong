export class Intro extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key

  constructor(key = "intro") {
    super({
      key,
      pack: {
        files: [
          {
            type: "rexWebFont",
            key: "webfont",
            config: {
              google: {
                families: ["Prompt"],
              },
            },
          },
        ],
      },
    })
  }
  preload() {}

  create() {
    this.game.scene.start("global-keys")
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )

    this.add
      .text(400, 100, "Yet Another PONG", {
        fontFamily: "Prompt",
        fontSize: "50px",
        align: "center",
      })
      .setOrigin(0.5)
    this.add.text(100, 220, "F: Fullscreen", {
      fontFamily: "Prompt",
      fontSize: "20px",
    })
    this.add.text(100, 250, "up/down: Move left paddle", {
      fontFamily: "Prompt",
      fontSize: "20px",
    })
    this.add
      .text(400, 350, "Press SPACE to start", {
        fontFamily: "Prompt",
        fontSize: "40px",
      })
      .setOrigin(0.5)
  }
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.startKey)) {
      this.game.scene.start("game")
      this.game.scene.stop("intro")
    }
  }
}
