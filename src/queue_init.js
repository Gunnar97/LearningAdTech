
//TODO не видит инициализацию?

window.wrapper = window.wrapper || {};

wrapper.cmd = wrapper.cmd || [];

window.wrapper.isWrapperReady = false;


window.wrapper.processQueue = function() {
    while (wrapper.cmd.length > 0) {
        const func = wrapper.cmd.shift();
        if (typeof func === 'function') {
            func();
        }
    }
    window.wrapper.isWrapperReady = true;
};