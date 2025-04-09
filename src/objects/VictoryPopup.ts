import { Scene } from 'phaser';

export class VictoryPopup {
    private scene: Scene;
    private container: Phaser.GameObjects.Container;
    private background: Phaser.GameObjects.Rectangle;
    private titleText: Phaser.GameObjects.Text;
    private messageText: Phaser.GameObjects.Text;
    private restartButton: Phaser.GameObjects.Text;
    private homeButton: Phaser.GameObjects.Text;
    private onRestart: () => void;
    private onHome: () => void;

    constructor(scene: Scene, onRestart: () => void, onHome: () => void) {
        this.scene = scene;
        this.onRestart = onRestart;
        this.onHome = onHome;
        
        // Create container for all popup elements
        this.container = this.scene.add.container(0, 0);
        this.container.setVisible(false);
        
        // Create semi-transparent background
        const width = this.scene.cameras.main.width;
        const height = this.scene.cameras.main.height;
        this.background = this.scene.add.rectangle(width / 2, height / 2, width * 0.8, height * 0.6, 0x000000, 0.8);
        this.background.setStrokeStyle(4, 0xffffff);
        
        // Create title text
        this.titleText = this.scene.add.text(width / 2, height / 2 - 100, 'VICTORY!', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);
        
        // Create message text
        this.messageText = this.scene.add.text(width / 2, height / 2, 'Player X Wins!', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        // Create restart button
        this.restartButton = this.scene.add.text(width / 2 - 80, height / 2 + 100, 'Play Again', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#4a7aa7',
            padding: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Create home button
        this.homeButton = this.scene.add.text(width / 2 + 80, height / 2 + 100, 'Home', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#4a7aa7',
            padding: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Add all elements to container
        this.container.add([
            this.background,
            this.titleText,
            this.messageText,
            this.restartButton,
            this.homeButton
        ]);
        
        // Add button events
        this.restartButton.on('pointerdown', () => {
            this.hide();
            this.onRestart();
        });
        
        this.homeButton.on('pointerdown', () => {
            this.hide();
            this.onHome();
        });
        
        // Add hover effects
        this.restartButton.on('pointerover', () => {
            this.restartButton.setBackgroundColor('#5d8fc1');
        });
        
        this.restartButton.on('pointerout', () => {
            this.restartButton.setBackgroundColor('#4a7aa7');
        });
        
        this.homeButton.on('pointerover', () => {
            this.homeButton.setBackgroundColor('#5d8fc1');
        });
        
        this.homeButton.on('pointerout', () => {
            this.homeButton.setBackgroundColor('#4a7aa7');
        });
    }
    
    public show(winner: number): void {
        if (winner === 0) {
            this.titleText.setText('DRAW!');
            this.messageText.setText('The game ended in a draw!');
        } else {
            const playerSymbol = winner === 1 ? 'X' : 'O';
            const playerColor = winner === 1 ? '#ff6666' : '#6666ff';
            this.titleText.setText('VICTORY!');
            this.messageText.setText(`Player ${playerSymbol} Wins!`);
            this.messageText.setColor(playerColor);
        }
        
        this.container.setVisible(true);
        this.container.setDepth(1000); // Ensure it's on top of everything
    }
    
    public hide(): void {
        this.container.setVisible(false);
    }
}
