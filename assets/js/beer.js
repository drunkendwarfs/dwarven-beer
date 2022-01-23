(function () {
    'use strict';

    class SteinCanvasCreator {
        static createCanvas(containerSelector = "div[data-beer=stein]", parent = null) {
            let container = (parent || document).querySelector(containerSelector);
            if (!container) {
                throw new Error("No container for stein found!");
            }
            if (container.offsetWidth < container.offsetHeight / 2) {
                container.style.width = container.offsetHeight + "px";
            }
            let canvas = document.createElement("canvas");
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            container.innerHTML = "";
            container.appendChild(canvas);
            let isResizing = false;
            let afterResize = () => {
                if (!isResizing) {
                    if (container && canvas && container.parentElement) {
                        canvas.width = container.offsetWidth;
                        canvas.height = container.offsetHeight;
                        container.appendChild(canvas);
                    }
                }
                else {
                    isResizing = false;
                    requestAnimationFrame(afterResize);
                }
            };
            window.addEventListener("resize", () => {
                isResizing = true;
                if (canvas.parentElement) {
                    canvas.remove();
                }
                window.requestAnimationFrame(afterResize);
            });
            return canvas;
        }
    }

    class Stein {
        constructor() {
            this.fillPercentage = 0;
            this.canvas = SteinCanvasCreator.createCanvas();
            this.context = this.canvas.getContext("2d");
        }
        update(progress) {
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
        drawLiquid(progress, size, context) {
            let x = size * 0.2;
            let w = size * 0.6;
            let y = size * 0.9;
            let h = size * 0.65 * this.subProgress(progress, 0, 0.8);
            context.fillStyle = "hsl(38, 100%, 50%)";
            context.fillRect(x, y - h, w, h);
        }
        drawFoam(progress, size, context) {
            progress = this.subProgress(progress, 0.8, 0.2);
            if (progress <= 0) {
                return;
            }
            let x = size * 0.2;
            let w = size * 0.6;
            let y = size * 0.25;
            let h = size * 0.15 * progress;
            context.fillStyle = "hsl(38, 12%, 90%)";
            context.fillRect(x, y - h, w, h);
        }
        subProgress(progress, offset, duration) {
            offset = Math.min(1, Math.max(0, offset));
            if (duration <= 0 || progress < offset) {
                return 0;
            }
            return Math.min(1, (progress - offset) / duration);
        }
    }

    class DwarvenBeer {
        constructor() {
            this.initialBeerServed = false;
            this.stein = new Stein();
            this.stein.draw();
            if (!this.initialBeerServed) {
                this.drawInitialBeer();
            }
        }
        drawInitialBeer() {
            let progress = 0;
            let startTs = performance.now();
            let duration = 3000;
            let update = (ts) => {
                progress = Math.min(1, (ts - startTs) / duration);
                this.stein.update(progress);
                if (progress < 1) {
                    window.requestAnimationFrame(update);
                }
                else {
                    this.initialBeerServed = true;
                }
            };
            window.requestAnimationFrame(update);
        }
    }

    new DwarvenBeer();

})();
//# sourceMappingURL=beer.js.map
