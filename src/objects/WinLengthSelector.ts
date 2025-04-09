import { Scene } from 'phaser';

export class WinLengthSelector {
    private scene: Scene;
    private x: number;
    private y: number;
    private callback: (length: number) => void;
    private currentLength: number = 3;
    private minLength: number = 3;
    private maxLength: number = 5;
    
    private lengthText!: Phaser.GameObjects.Text;
    private decreaseButton!: Phaser.GameObjects.Text;
    private increaseButton!: Phaser.GameObjects.Text;
    private label!: Phaser.GameObjects.Text;
    private description!: Phaser.GameObjects.Text;

    constructor(scene: Scene, x: number, y: number, callback: (length: number) => void) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.callback = callback;
        
        this.create();
    }

    private create(): void {
        // Add label
        this.label = this.scene.add.text(
            this.x,
            this.y - 40,
            'Win Length:',
            {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        // Add decrease button
        this.decreaseButton = this.scene.add.text(
            this.x - 50,
            this.y,
            '-',
            {
                fontFamily: 'Arial',
                fontSize: '32px',
                color: '#ffffff',
                backgroundColor: '#555555',
                padding: {
                    left: 15,
                    right: 15,
                    top: 5,
                    bottom: 5
                }
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Add length text
        this.lengthText = this.scene.add.text(
            this.x,
            this.y,
            this.currentLength.toString(),
            {
                fontFamily: 'Arial',
                fontSize: '32px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        // Add increase button
        this.increaseButton = this.scene.add.text(
            this.x + 50,
            this.y,
            '+',
            {
                fontFamily: 'Arial',
                fontSize: '32px',
                color: '#ffffff',
                backgroundColor: '#555555',
                padding: {
                    left: 15,
                    right: 15,
                    top: 5,
                    bottom: 5
                }
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Add description
        this.description = this.scene.add.text(
            this.x,
            this.y + 40,
            `Grid Size: ${this.currentLength + 3}x${this.currentLength + 3}`,
            {
                fontFamily: 'Arial',
                fontSize: '16px',
                color: '#cccccc'
            }
        ).setOrigin(0.5);

        // Add click events
        this.decreaseButton.on('pointerdown', () => {
            if (this.currentLength > this.minLength) {
                this.currentLength--;
                this.updateLengthText();
                this.callback(this.currentLength);
            }
        });

        this.increaseButton.on('pointerdown', () => {
            if (this.currentLength < this.maxLength) {
                this.currentLength++;
                this.updateLengthText();
                this.callback(this.currentLength);
            }
        });

        // Add hover effects
        this.decreaseButton.on('pointerover', () => {
            this.decreaseButton.setStyle({ backgroundColor: '#777777' });
        });

        this.decreaseButton.on('pointerout', () => {
            this.decreaseButton.setStyle({ backgroundColor: '#555555' });
        });

        this.increaseButton.on('pointerover', () => {
            this.increaseButton.setStyle({ backgroundColor: '#777777' });
        });

        this.increaseButton.on('pointerout', () => {
            this.increaseButton.setStyle({ backgroundColor: '#555555' });
        });
    }

    private updateLengthText(): void {
        this.lengthText.setText(this.currentLength.toString());
        this.description.setText(`Grid Size: ${this.currentLength + 3}x${this.currentLength + 3}`);
    }
}
