import { Scene } from 'phaser';
import { WinLengthSelector } from '../objects/WinLengthSelector';

export class HomeScene extends Scene {
    private title!: Phaser.GameObjects.Text;
    private subtitle!: Phaser.GameObjects.Text;
    private playButton!: Phaser.GameObjects.Text;
    private winLengthSelector!: WinLengthSelector;
    private selectedWinLength: number = 3;
    private isometricTiles: Phaser.GameObjects.Polygon[] = [];

    constructor() {
        super('HomeScene');
    }

    create(): void {
        // Add background gradient
        const background = this.add.graphics();
        background.fillGradientStyle(0x333344, 0x333344, 0x222233, 0x222233, 1);
        background.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
        
        // Create isometric background tiles
        this.createIsometricBackground();
        
        // Add title with shadow for 2.5D effect
        this.title = this.add.text(
            this.cameras.main.centerX, 
            100, 
            '2.5D Tic-Tac-Toe', 
            { 
                fontFamily: 'Arial', 
                fontSize: '48px', 
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4,
                shadow: {
                    offsetX: 3,
                    offsetY: 3,
                    color: '#000000',
                    blur: 5,
                    fill: true
                }
            }
        ).setOrigin(0.5);
        
        // Add subtitle
        this.subtitle = this.add.text(
            this.cameras.main.centerX,
            160,
            'Isometric Edition',
            {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#cccccc',
                stroke: '#000000',
                strokeThickness: 2
            }
        ).setOrigin(0.5);

        // Add win length selector
        this.winLengthSelector = new WinLengthSelector(
            this,
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            (length: number) => {
                this.selectedWinLength = length;
            }
        );

        // Add play button with 3D effect
        this.playButton = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.height - 100,
            'Play Game',
            {
                fontFamily: 'Arial',
                fontSize: '32px',
                color: '#ffffff',
                backgroundColor: '#4a7aa7',
                padding: {
                    left: 20,
                    right: 20,
                    top: 10,
                    bottom: 10
                },
                shadow: {
                    offsetX: 3,
                    offsetY: 3,
                    color: '#000000',
                    blur: 5,
                    fill: true
                }
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Add click event to play button
        this.playButton.on('pointerdown', () => {
            this.scene.start('GameScene', { winLength: this.selectedWinLength });
        });

        // Add hover effect to play button
        this.playButton.on('pointerover', () => {
            this.playButton.setStyle({ backgroundColor: '#5d8fc1' });
        });

        this.playButton.on('pointerout', () => {
            this.playButton.setStyle({ backgroundColor: '#4a7aa7' });
        });
    }
    
    private createIsometricBackground(): void {
        const tileWidth = 64;
        const tileHeight = 32;
        const gridSize = 5; // Background grid size
        
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Create a decorative isometric grid in the background
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                // Calculate isometric position - offset to bottom right corner
                const isoX = width * 0.75 + (x - y) * tileWidth / 2;
                const isoY = height * 0.6 + (x + y) * tileHeight / 2;
                
                // Create points for isometric tile
                const points = [
                    { x: 0, y: -tileHeight / 2 },
                    { x: tileWidth / 2, y: 0 },
                    { x: 0, y: tileHeight / 2 },
                    { x: -tileWidth / 2, y: 0 }
                ];
                
                // Create cell with lower opacity for background effect
                const colorVariation = Phaser.Math.Between(0, 30);
                const baseColor = 0x4a7aa7;
                const tileColor = baseColor + colorVariation * 0x000100;
                
                const tile = this.add.polygon(isoX, isoY, points, tileColor, 0.2);
                tile.setStrokeStyle(1, 0xffffff, 0.3);
                tile.setDepth(-1); // Ensure it stays in the background
                
                this.isometricTiles.push(tile);
            }
        }
    }
    
    update(): void {
        // Add subtle animation to background tiles
        this.isometricTiles.forEach((tile, index) => {
            const time = this.time.now / 1000;
            const offset = Math.sin(time + index * 0.1) * 0.5;
            tile.y = tile.y + offset * 0.05;
        });
    }
}
