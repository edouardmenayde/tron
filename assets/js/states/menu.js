export class Menu extends Phaser.State {
  create() {
    const title = this.add.text(0, 0, 'Tron', {
      fill: 'white',
      font: '100px fantasy'
    });
    title.alignIn(this.world, Phaser.CENTER);

    this.startGame();
  }

  startGame() {
    this.state.start('play');
  }
}
