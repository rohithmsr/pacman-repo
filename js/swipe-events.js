// Refered from = https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
export function handleGesture(e, touchstartX, touchstartY, touchendX, touchendY, threshold) {
    const limit = Math.tan(45 * 1.5 / 180 * Math.PI);

    let x = touchendX - touchstartX;
    let y = touchendY - touchstartY;
    let xy = Math.abs(x / y);
    let yx = Math.abs(y / x);
    if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
        if (yx <= limit) {
            if (x < 0) {
                // console.log("left");
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 }));
            } else {
                // console.log("right");
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 }));
            }
        }
        if (xy <= limit) {
            if (y < 0) {
                // console.log("top");
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', keyCode: 38 }));
            } else {
                // console.log("bottom");
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40 }));
            }
        }
    } else {
        // console.log("tap");
    }
}