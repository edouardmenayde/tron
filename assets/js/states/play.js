import client from "../client";
import { Presence } from "phoenix";

export class Play extends Phaser.State {
  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "0x";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  rand(max) {
    return Math.floor(Math.random() * max);
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
      console.info(`Player ${id} has already joined...`);

      return;
    }

    console.info(`A new player ${id} has joined !`);
    this.drawBike(newPlayer.metas[0], this.playersGroup);
  }

  onLeave(id, current, leftPlayer) {
    if (current.metas.length > 0) {
      console.info(`Player ${id} has left a device.`);
      return;
    }

    console.info(`Player ${id} has left.`);
    const playerId = player.id;

    const { graphic } = this.players.filter(p => {
      return p.id == playerId;
    });

    this.playersGroup.remove(graphic);
  }

  create() {
    this.playersGroup = this.add.group();
    this.players = [];

    const position = {
      x: this.rand(this.game.width),
      y: this.rand(this.game.height)
    };
    const color = this.getRandomColor();
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
      console.log(diff);
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
        console.info("Joined channel.");
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
