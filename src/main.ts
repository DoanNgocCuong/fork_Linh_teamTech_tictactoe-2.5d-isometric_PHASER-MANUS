import 'phaser';
import { HomeScene } from './scenes/HomeScene';
import { GameScene } from './scenes/GameScene';

// Game configuration
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#333333',
    scene: [HomeScene, GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    pixelArt: true // Enable pixelated rendering for the pixelated visual theme
};

// Initialize the game when the window loads
window.onload = () => {
    new Phaser.Game(config);
};
