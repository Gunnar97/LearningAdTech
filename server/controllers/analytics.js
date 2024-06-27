import {debounce} from "wrapperLib/src/debounce.js";
import clickhouse from "../clickhouse/clickhouse.js";

export const eventsCache = [];

export async function writeEvents() {
    const events = eventsCache.slice();
    eventsCache.length = 0;

    const values = events.map(event => {
        const { eventType, eventData } = event;
        const { time, timeSincePageLoad, timeToLoad, message } = eventData;
        return `('${eventType}', ${time}, ${timeSincePageLoad}, ${timeToLoad}, '${message || ''}')`;
    }).join(',');

    try {
        await clickhouse.query(`
            INSERT INTO analytics (eventType, time, timeSincePageLoad, timeToLoad, message) VALUES ${values}
        `).toPromise();
    } catch (error) {
        console.error('Error inserting events into ClickHouse:', error);
    }
}

export const writeEventsDebounced = debounce(writeEvents, 1000 * 60);

export const result = () => clickhouse.query(`
            SELECT * FROM analytics
        `).toPromise();