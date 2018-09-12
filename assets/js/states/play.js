import client from "../client";
import { Presence } from "phoenix";

export class Play extends Phaser.State {
  static generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "0x";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  static rand(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  drawBike({ color, position }, group) {
    const bike = this.make.graphics();
    bike.lineStyle(2, color, 1);
    bike.drawRect(position.x, position.y, 20, 2);

    group.add(bike);
    return bike;
  }

  onJoin(id, current, newPlayer) {
    if (current) {
      return;
    }

    this.playersGraphics.set(id, this.drawBike(newPlayer.metas[0], this.playersGroup));
  }

  onLeave(id, current, leftPlayer) {
    if (current.metas.length > 0) {
      return;
    }

    if (!this.playersGroup.remove(this.playersGraphics.get(id))) {
        this.playersGraphics.delete(id);
        throw new Error("Out of sync with the server...");
    }
  }

  create() {
    this.playersGroup = this.add.group();
    this.players = {};
    this.playersGraphics = new Map();

    const position = {
      x: Play.rand(100, this.game.width - 100),
      y: Play.rand(100, this.game.height - 100)
    };
    const color = Play.generateRandomColor();
    const newPlayer = {
      position: position,
      color: color
    };

    const channel = client.socket.channel("room:game", newPlayer);
    this.drawBike(newPlayer, this.playersGroup);

    channel.on("presence_state", state => {
      this.players = Presence.syncState(
        this.players,
        state,
        this.onJoin.bind(this),
        this.onLeave.bind(this)
      );
    });

    channel.on("presence_diff", diff => {
      this.players = Presence.syncDiff(
        this.players,
        diff,
        this.onJoin.bind(this),
        this.onLeave.bind(this)
      );
    });

    channel
      .join()
      .receive("ok", players => {
      })
      .receive("error", resp => {
        console.error("Unable to join", resp);
      });

    // this.input.onTap.add()
  }

  update() {}

  restart() {
    this.state.restart();
  }

  quit() {
    this.state.start("menu");
  }

  shutdown() {}
}
