import Phaser from "phaser"
import WebFontLoaderPlugin from "phaser3-rex-plugins/plugins/webfontloader-plugin.js"
import { Game } from "./Game/Game"
import { GlobalKeys } from "./GlobalKeys/GlobalKeys"
import { Intro } from "./Intro/Intro"
import { GameOver } from "./GameOver/GameOver"

export const game = (target: HTMLElement) =>
  new Phaser.Game({
    type: Phaser.AUTO,
    height: (9 / 16) * 800,
    width: 800,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: target,
    },
    physics: {
      default: "arcade",
    },
    scene: [Intro, GlobalKeys, Game, GameOver],
    plugins: {
      global: [
        {
          key: "WebFontLoader",
          plugin: WebFontLoaderPlugin,
          start: true,
        },
      ],
    },
  })
