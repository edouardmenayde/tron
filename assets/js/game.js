import {
    Boot
} from './states/boot';
import {
    Menu
} from './states/menu';
import {
    Play
} from './states/play';

export class Game extends Phaser.Game {
    constructor() {
        super({
            enableDebug: true,
            width: 1280,
            height: 720,
            renderer: Phaser.CANVAS,
            antialias: false,
            multiTexture: true,
            parent: document.querySelector('#game-container')
        });
        this.state.add('boot', Boot);
        this.state.add('menu', Menu);
        this.state.add('play', Play);

        this.state.start('boot');
    }
}
