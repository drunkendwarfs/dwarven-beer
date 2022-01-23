import { SteinCanvasCreator } from "./SteinCanvasCreator";

export class Stein {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D|null;
    private fillPercentage: number = 0;

    constructor() {
        this.canvas = SteinCanvasCreator.createCanvas();
        this.context = this.canvas.getContext("2d");
    }

    update(progress: number) {
        this.fillPercentage = progress;
        this.draw();
    }

    draw() {
        if (!this.context) {
            return;
        }
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawLiquid(this.fillPercentage, this.canvas.width, this.context);
        this.drawFoam(this.fillPercentage, this.canvas.width, this.context);
    }

    private drawLiquid(progress: number, size: number, context: CanvasRenderingContext2D) {
        let x: number = size * 0.2;
        let w: number = size * 0.6;
        let y: number = size * 0.9; // this is the bottom
        let h: number = size * 0.65 * this.subProgress(progress, 0, 0.8);
        context.fillStyle = "hsl(38, 100%, 50%)";
        context.fillRect(x, y - h, w, h);
    }

    private drawFoam(progress: number, size: number, context: CanvasRenderingContext2D) {
        progress = this.subProgress(progress, 0.8, 0.2);
        if (progress <= 0) {
            return;
        }
        let x: number = size * 0.2;
        let w: number = size * 0.6;
        let y: number = size * 0.25; // this is the bottom
        let h: number = size * 0.15 * progress;
        context.fillStyle = "hsl(38, 12%, 90%)";
        context.fillRect(x, y - h, w, h);
    }

    /**
     * Calculates a sub-progress to a given progress value. The sub-progress starts
     * somewhere along the path of the parent-progress, and has a duration less or 
     * equal to the remaining parent-progress.
     * Example:
     *  progress [0, 1] = 0.5
     *  sub-progress 
     *      offset = 0.2
     *      duration = 0.5
     *      -> is at (0.5 - 0.2) / 0.5 => 3/5
     * @param progress 
     * @param offset 
     * @param duration 
     */
    private subProgress(progress: number, offset: number, duration: number) {
        offset = Math.min(1, Math.max(0, offset));
        if (duration <= 0 || progress < offset) {
            return 0;
        }
        return Math.min(1, (progress - offset) / duration);
    }
}