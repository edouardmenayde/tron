export class Boot extends Phaser.State {
  init() {
    this.input.maxPointers = 1;
    this.game.renderer.renderSession.roundPixels = true;
    this.tweens.frameBased = true;

    this.whitePixel = this.add.bitmapData(1, 1);
    this.whitePixel.fill(255, 255, 255);

    this.bar = this.whitePixel.addToWorld();
    this.bar.width = 100;
    this.bar.height = 10;
    this.bar.alignIn(this.world.bounds, Phaser.CENTER);
  }

  preload() {
    this.load.setPreloadSprite(this.bar);
  }

  create() {
    this.state.start('menu');
  }

  shutdown() {
    this.whitePixel.destroy();
    this.whitePixel = null;
  }
}
