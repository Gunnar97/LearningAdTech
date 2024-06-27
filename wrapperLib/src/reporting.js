 import { debounce } from "./debounce.js";

const ANAL_URL = 'http://localhost:8080/analytics'
 const ANAL_EVENTS_URL = 'http://localhost:8080/analytics_event'

const eventsCache = [];

function sendEvents() {

    fetch(ANAL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventsCache.filter((item) => item.eventType === "0" || item.eventType === "1")),
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
    console.log(eventsCache.filter((item) => item.eventType === 0 || item.eventType === 1))
}

 function sendAnalyticsEvents() {

     fetch(ANAL_EVENTS_URL, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify( eventsCache.filter((item) => item.eventType === "3" || item.eventType === "4" || item.eventType === "5")),
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
     console.log( eventsCache.filter((item) => item.eventType === 3 || item.eventType === 4 || item.eventType === 5))
 }


 const postDataAnalytics = () => {
     sendEvents();
     sendAnalyticsEvents();
 }



window.addEventListener('beforeunload', postDataAnalytics)
export const sendEventDebounced = debounce(postDataAnalytics, 1000)


export function recordEvent(eventType, eventData = {}) {
    eventsCache.push({ eventType, eventData });

    sendEventDebounced()
}
