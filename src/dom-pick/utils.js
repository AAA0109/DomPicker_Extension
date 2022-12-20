;
export const getElementBounds = (el) => {
    const rect = el.getBoundingClientRect();
    return {
        x: window.pageXOffset + rect.left,
        y: window.pageYOffset + rect.top,
        width: el.offsetWidth,
        height: el.offsetHeight,
    };
};

export const checkSimilarBounds = (b1, b2) => {
    const keys = ['x', 'y', 'width', 'height'];
    for (let i = 0 ; i < keys.length; i ++) {
        if (Math.abs(b1[keys[i]] - b2[keys[i]]) > 0.1 )
            return false;
    }
    return true;
}