export function debounce(func, wait, maxTime) {
    let timeout;
    let maxTimeoutID

    return function () {
        const context = this,
            args = arguments;
        if (maxTime && !maxTimeoutID) {
            maxTimeoutID = setTimeout(() => {
                func.apply(context, args);
            }, maxTime)
        }

        const later = function () {
             timeout = null;
             maxTimeoutID = null
             clearTimeout(maxTimeoutID)
             return func.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
