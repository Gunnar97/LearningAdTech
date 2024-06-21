import { debounce } from "./debounce.js";

const ANAL_URL = 'http://a.com:8080/analytics'

const eventsCache = [];

function sendEvents() {
    // network issues
    // events stream not stopping stopping debounce  - maxTime
    // page close - beforeunload + sendBeacon
    fetch(ANAL_URL, {
        body: JSON.stringify(eventsCache),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
}

window.addEventListener('beforeunload', sendEvents)
export const sendEventDebounced = debounce(sendEvents, 1000)


export function recordEvent(eventType, eventData = {}) {
    eventsCache.push({ eventType, eventData });

    sendEventDebounced()
}
