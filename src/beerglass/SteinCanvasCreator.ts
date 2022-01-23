export class SteinCanvasCreator {

    static createCanvas(containerSelector: string = "div[data-beer=stein]", parent: HTMLElement|null = null): HTMLCanvasElement {
        let container = (parent || document).querySelector(containerSelector) as HTMLElement;
        if (!container) {
            throw new Error("No container for stein found!");
        }

        // The canvas will copy the size of the container and fill it.
        // However, the container must be a square, and some older browsers don't support the
        // CSS aspect-ratio, so it would have no width.
        if (container.offsetWidth < container.offsetHeight / 2) {
            // Note: some browsers round width and height differently, such that a square
            // with width and height of e.g. 100.2 ends up with offsetWidth = 100 and
            // offsetHeight = 101. Thus we only adjust if there is a large difference.
            container.style.width = container.offsetHeight + "px";
        }

        let canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        container.innerHTML = "";
        container.appendChild(canvas);

        // Resize the canvas if necessary
        let isResizing: boolean = false;
        let afterResize = () => {
            if (!isResizing) {
                if (container && canvas && container.parentElement) {
                    canvas.width = container.offsetWidth;
                    canvas.height = container.offsetHeight;
                    container.appendChild(canvas);
                }
            } else {
                isResizing = false;
                requestAnimationFrame(afterResize);
            }
        }
        window.addEventListener("resize", () => {
            // We have to remove the canvas for the container to correctly update its size
            // while maintaining the aspect ratio
            isResizing = true;
            if (canvas.parentElement) {
                canvas.remove();
            }
            window.requestAnimationFrame(afterResize);
        });

        return canvas;
    }

}