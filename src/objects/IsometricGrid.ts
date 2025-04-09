import { Scene } from 'phaser';

export class IsometricGrid {
    private scene: Scene;
    private gridSize: number;
    private winLength: number;
    private tileWidth: number = 64;
    private tileHeight: number = 32;
    private gridCells: Phaser.GameObjects.Polygon[][] = [];
    private gridState: number[][] = [];
    private centerX: number;
    private centerY: number;
    private currentPlayer: number = 1; // 1 for X, 2 for O
    private gameOver: boolean = false;
    private onGameOver: (winner: number) => void;

    constructor(scene: Scene, winLength: number, centerX: number, centerY: number, onGameOver: (winner: number) => void) {
        this.scene = scene;
        this.winLength = winLength;
        this.gridSize = winLength + 3; // Grid size is 3 units larger than required win length
        this.centerX = centerX;
        this.centerY = centerY;
        this.onGameOver = onGameOver;
        
        // Initialize grid state
        this.gridState = Array(this.gridSize).fill(0).map(() => Array(this.gridSize).fill(0));
        
        this.create();
    }

    private create(): void {
        // Calculate grid offset to center it
        const gridWidthPx = this.gridSize * this.tileWidth;
        const gridHeightPx = this.gridSize * this.tileHeight;
        
        // Create grid cells
        for (let y = 0; y < this.gridSize; y++) {
            this.gridCells[y] = [];
            for (let x = 0; x < this.gridSize; x++) {
                // Calculate isometric position
                const isoX = this.centerX + (x - y) * this.tileWidth / 2;
                const isoY = this.centerY + (x + y) * this.tileHeight / 2 - gridHeightPx / 2;
                
                // Create cell
                const points = [
                    { x: 0, y: -this.tileHeight / 2 },
                    { x: this.tileWidth / 2, y: 0 },
                    { x: 0, y: this.tileHeight / 2 },
                    { x: -this.tileWidth / 2, y: 0 }
                ];
                
                const cell = this.scene.add.polygon(isoX, isoY, points, 0x4a7aa7, 0.5);
                cell.setStrokeStyle(2, 0xffffff);
                
                // Make cell interactive
                cell.setInteractive();
                
                // Add click event
                cell.on('pointerdown', () => {
                    this.handleCellClick(x, y);
                });
                
                this.gridCells[y][x] = cell;
            }
        }
    }

    private handleCellClick(x: number, y: number): void {
        // Ignore if game is over or cell is already filled
        if (this.gameOver || this.gridState[y][x] !== 0) {
            return;
        }
        
        // Update grid state
        this.gridState[y][x] = this.currentPlayer;
        
        // Draw X or O
        this.drawSymbol(x, y, this.currentPlayer);
        
        // Check for win
        if (this.checkWin(x, y, this.currentPlayer)) {
            this.gameOver = true;
            this.onGameOver(this.currentPlayer);
            return;
        }
        
        // Check for draw
        if (this.checkDraw()) {
            this.gameOver = true;
            this.onGameOver(0); // 0 indicates draw
            return;
        }
        
        // Switch player
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }

    private drawSymbol(x: number, y: number, player: number): void {
        const cell = this.gridCells[y][x];
        const graphics = this.scene.add.graphics();
        
        if (player === 1) {
            // Draw X
            graphics.lineStyle(3, 0xff0000, 1);
            graphics.beginPath();
            graphics.moveTo(-this.tileWidth / 4, -this.tileHeight / 4);
            graphics.lineTo(this.tileWidth / 4, this.tileHeight / 4);
            graphics.moveTo(this.tileWidth / 4, -this.tileHeight / 4);
            graphics.lineTo(-this.tileWidth / 4, this.tileHeight / 4);
            graphics.strokePath();
        } else {
            // Draw O
            graphics.lineStyle(3, 0x0000ff, 1);
            graphics.beginPath();
            // Use arc instead of ellipse for compatibility
            const radius = Math.min(this.tileWidth / 3, this.tileHeight / 3);
            graphics.arc(0, 0, radius, 0, Math.PI * 2);
            graphics.strokePath();
        }
        
        graphics.setPosition(cell.x, cell.y);
    }

    private checkWin(x: number, y: number, player: number): boolean {
        // Check horizontal
        let count = 0;
        for (let i = 0; i < this.gridSize; i++) {
            if (this.gridState[y][i] === player) {
                count++;
                if (count >= this.winLength) return true;
            } else {
                count = 0;
            }
        }
        
        // Check vertical
        count = 0;
        for (let i = 0; i < this.gridSize; i++) {
            if (this.gridState[i][x] === player) {
                count++;
                if (count >= this.winLength) return true;
            } else {
                count = 0;
            }
        }
        
        // Check diagonal (top-left to bottom-right)
        count = 0;
        const minDiag1 = Math.min(x, y);
        let startX = x - minDiag1;
        let startY = y - minDiag1;
        
        while (startX < this.gridSize && startY < this.gridSize) {
            if (this.gridState[startY][startX] === player) {
                count++;
                if (count >= this.winLength) return true;
            } else {
                count = 0;
            }
            startX++;
            startY++;
        }
        
        // Check diagonal (top-right to bottom-left)
        count = 0;
        const minDiag2 = Math.min(this.gridSize - 1 - x, y);
        startX = x + minDiag2;
        startY = y - minDiag2;
        
        while (startX >= 0 && startY < this.gridSize) {
            if (this.gridState[startY][startX] === player) {
                count++;
                if (count >= this.winLength) return true;
            } else {
                count = 0;
            }
            startX--;
            startY++;
        }
        
        return false;
    }

    private checkDraw(): boolean {
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.gridState[y][x] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    public reset(): void {
        // Clear grid state
        this.gridState = Array(this.gridSize).fill(0).map(() => Array(this.gridSize).fill(0));
        
        // Remove all symbols
        this.scene.children.list
            .filter(child => child instanceof Phaser.GameObjects.Graphics)
            .forEach(child => child.destroy());
        
        // Reset game state
        this.currentPlayer = 1;
        this.gameOver = false;
    }
    
    public getGridSize(): number {
        return this.gridSize;
    }
    
    public getCurrentPlayer(): number {
        return this.currentPlayer;
    }
}
