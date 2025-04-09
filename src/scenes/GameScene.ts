import { Scene } from 'phaser';
import { IsometricGrid } from '../objects/IsometricGrid';
import { VictoryPopup } from '../objects/VictoryPopup';

export class GameScene extends Scene {
    private grid!: IsometricGrid;
    private winLength: number = 3;
    private statusText!: Phaser.GameObjects.Text;
    private homeButton!: Phaser.GameObjects.Text;
    private resetButton!: Phaser.GameObjects.Text;
    private currentPlayer: number = 1; // 1 for X, 2 for O
    private gameInfo!: Phaser.GameObjects.Text;
    private playerXLabel!: Phaser.GameObjects.Text;
    private playerOLabel!: Phaser.GameObjects.Text;
    private playerIndicator!: Phaser.GameObjects.Graphics;
    private victoryPopup!: VictoryPopup;

    constructor() {
        super('GameScene');
    }

    init(data: any): void {
        // Get win length from scene data
        this.winLength = data.winLength || 3;
        this.currentPlayer = 1;
    }

    create(): void {
        // Add background gradient
        const background = this.add.graphics();
        background.fillGradientStyle(0x333344, 0x333344, 0x222233, 0x222233, 1);
        background.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
        
        // Add title with shadow for 2.5D effect
        this.add.text(
            this.cameras.main.centerX, 
            50, 
            '2.5D Tic-Tac-Toe', 
            { 
                fontFamily: 'Arial', 
                fontSize: '32px', 
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 3,
                shadow: {
                    offsetX: 2,
                    offsetY: 2,
                    color: '#000000',
                    blur: 3,
                    fill: true
                }
            }
        ).setOrigin(0.5);

        // Add status text with 3D effect
        this.statusText = this.add.text(
            this.cameras.main.centerX,
            100,
            'Player X Turn',
            {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 2
            }
        ).setOrigin(0.5);

        // Add game info text
        this.gameInfo = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.height - 100,
            `Win Length: ${this.winLength} | Grid Size: ${this.winLength + 3}x${this.winLength + 3}`,
            {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#cccccc'
            }
        ).setOrigin(0.5);

        // Add player labels
        this.playerXLabel = this.add.text(
            100, 
            150, 
            'Player X', 
            { 
                fontFamily: 'Arial', 
                fontSize: '20px', 
                color: '#ff6666',
                stroke: '#000000',
                strokeThickness: 2
            }
        ).setOrigin(0.5);
        
        this.playerOLabel = this.add.text(
            this.cameras.main.width - 100, 
            150, 
            'Player O', 
            { 
                fontFamily: 'Arial', 
                fontSize: '20px', 
                color: '#6666ff',
                stroke: '#000000',
                strokeThickness: 2
            }
        ).setOrigin(0.5);
        
        // Add player turn indicator
        this.playerIndicator = this.add.graphics();
        this.updatePlayerIndicator();

        // Create isometric grid
        this.grid = new IsometricGrid(
            this,
            this.winLength,
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            (winner: number) => this.handleGameOver(winner)
        );

        // Create victory popup
        this.victoryPopup = new VictoryPopup(
            this,
            () => this.resetGame(),
            () => this.scene.start('HomeScene')
        );

        // Add reset button with 3D effect
        this.resetButton = this.add.text(
            this.cameras.main.centerX - 100,
            this.cameras.main.height - 50,
            'Reset',
            {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#ffffff',
                backgroundColor: '#4a7aa7',
                padding: {
                    left: 15,
                    right: 15,
                    top: 8,
                    bottom: 8
                },
                shadow: {
                    offsetX: 2,
                    offsetY: 2,
                    color: '#000000',
                    blur: 3,
                    fill: true
                }
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Add home button with 3D effect
        this.homeButton = this.add.text(
            this.cameras.main.centerX + 100,
            this.cameras.main.height - 50,
            'Home',
            {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#ffffff',
                backgroundColor: '#4a7aa7',
                padding: {
                    left: 15,
                    right: 15,
                    top: 8,
                    bottom: 8
                },
                shadow: {
                    offsetX: 2,
                    offsetY: 2,
                    color: '#000000',
                    blur: 3,
                    fill: true
                }
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Add click events
        this.resetButton.on('pointerdown', () => {
            this.resetGame();
        });

        this.homeButton.on('pointerdown', () => {
            this.scene.start('HomeScene');
        });

        // Add hover effects
        this.resetButton.on('pointerover', () => {
            this.resetButton.setStyle({ backgroundColor: '#5d8fc1' });
        });

        this.resetButton.on('pointerout', () => {
            this.resetButton.setStyle({ backgroundColor: '#4a7aa7' });
        });

        this.homeButton.on('pointerover', () => {
            this.homeButton.setStyle({ backgroundColor: '#5d8fc1' });
        });

        this.homeButton.on('pointerout', () => {
            this.homeButton.setStyle({ backgroundColor: '#4a7aa7' });
        });
    }

    private updatePlayerIndicator(): void {
        this.playerIndicator.clear();
        
        if (this.currentPlayer === 1) {
            // Highlight Player X
            this.playerIndicator.lineStyle(3, 0xff6666, 1);
            this.playerIndicator.strokeRoundedRect(30, 130, 140, 40, 10);
        } else {
            // Highlight Player O
            this.playerIndicator.lineStyle(3, 0x6666ff, 1);
            this.playerIndicator.strokeRoundedRect(this.cameras.main.width - 170, 130, 140, 40, 10);
        }
    }

    private handleGameOver(winner: number): void {
        if (winner === 0) {
            this.statusText.setText('Game Over - Draw!');
        } else {
            const winnerSymbol = winner === 1 ? 'X' : 'O';
            this.statusText.setText(`Game Over - Player ${winnerSymbol} Wins!`);
        }
        
        // Show victory popup
        this.victoryPopup.show(winner);
    }

    private resetGame(): void {
        this.grid.reset();
        this.currentPlayer = 1;
        this.statusText.setText('Player X Turn');
        this.updatePlayerIndicator();
    }

    update(): void {
        // Update player turn text and indicator if game is still active
        this.currentPlayer = this.grid.getCurrentPlayer();
        
        if (this.currentPlayer === 1) {
            this.statusText.setText('Player X Turn');
        } else {
            this.statusText.setText('Player O Turn');
        }
        this.updatePlayerIndicator();
    }
}
