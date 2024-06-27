 import { debounce } from "../debounce.js";

const ANAL_URL = 'http://localhost:8080/analytics'

const eventsCache = [];

function sendEvents() {

    fetch(ANAL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventsCache),
    })
        .then(response => {
            if (response.status === 200) {
                console.log('Data sent successfully');
            } else {
                console.log('Failed to send data');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}




window.addEventListener('beforeunload', sendEvents)
export const sendEventDebounced = debounce(sendEvents, 1000)


export function recordEvent(eventType, eventData = {}) {
    eventsCache.push({ eventType, eventData });

    sendEventDebounced()
}
