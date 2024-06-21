


export function ensureAndGetGlobal(win = window){
    win.wrapper = win.wrapper || {};

    win.wrapper.cmd = win.wrapper.cmd || [];

    return win.wrapper;
}


export function processQueue(win = window) {
    const wrapper = ensureAndGetGlobal(win)
    while (wrapper.cmd.length > 0) {
        const func = wrapper.cmd.shift();
        if (typeof func === 'function') {
            func();
        }
    }
    wrapper.isWrapperReady = true;
}
export function initQueue(win = window) {
    const wrapper = ensureAndGetGlobal(win);

    wrapper.isWrapperReady = false;
    wrapper.processQueue = processQueue.bind(null,win)
}
export function addToQueue(fn, win=window){
    const wrapper = ensureAndGetGlobal(win);
    wrapper.cmd.push(fn)
}
