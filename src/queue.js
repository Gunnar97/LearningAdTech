(function () {
    window.wrapper = window.wrapper || { cmd: [] }
    let queueProcessed = false;

    function processQueue() {
        if (queueProcessed) return;
        while (wrapper.cmd.length > 0) {
            const command = wrapper.cmd.shift();
            if (typeof command === "function") {
                command();
            }
        }

        queueProcessed = true;
    }

    document.addEventListener("DOMContentLoaded", processQueue);

    wrapper.cmd.push = function (command) {
        if (queueProcessed) {
            command();
        }
    };
})();
