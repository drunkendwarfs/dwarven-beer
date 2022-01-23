import { Stein } from "./beerglass/Stein";

export class DwarvenBeer {
    private stein: Stein;
    private initialBeerServed: boolean = false;

    constructor() {
        this.stein = new Stein();
        this.stein.draw();
        if (!this.initialBeerServed) {
            this.drawInitialBeer();
        }
    }

    private drawInitialBeer() {
        let progress: number = 0;
        let startTs: number = performance.now();
        let duration: number = 3000;

        let update = (ts: number) => {
            progress = Math.min(1, (ts - startTs) / duration);
            this.stein.update(progress);
            if (progress < 1) {
                window.requestAnimationFrame(update);
            } else {
                this.initialBeerServed = true;
            }
        }
        
        window.requestAnimationFrame(update);
    }
}