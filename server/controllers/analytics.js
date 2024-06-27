import {debounce} from "wrapperLib/src/debounce.js";
import clickhouse from "../clickhouse/clickhouse.js";

export const eventsCache = [];

export async function writeEvents() {

    const events = eventsCache.filter(item=> item.eventType === 0 || item.eventType === 1).slice();
    const analyticsEvents = eventsCache.filter(item=> item.eventType !== 0 && item.eventType !== 1).slice();

    eventsCache.length = 0;

    const valuesForAnalytics = events.map(event => {
        const { eventType, eventData } = event;
        const { time, timeSincePageLoad, timeToLoad, message } = eventData;
        return `('${eventType}', ${time}, ${timeSincePageLoad}, ${timeToLoad}, '${message || ''}')`;
    }).join(',');



    const valuesForAnalytics_event = analyticsEvents.map(event => {
        const { eventType, eventData } = event;
        const { time, bidderCode, unitCode, cpm } = eventData;
        return `('${eventType}', ${time}, '${bidderCode}', '${unitCode}', ${cpm || ' '})`;
    }).join(',');


    try {
        await clickhouse.query(`
            INSERT INTO analytics (eventType, time, timeSincePageLoad, timeToLoad, message) VALUES ${valuesForAnalytics}
        `).toPromise();


        await clickhouse.query(`
            INSERT INTO analytics_events (eventType, time, bidderCode, unitCode, cpm) VALUES ${valuesForAnalytics_event}
        `).toPromise();


        console.log('Data inserted successfully into both tables');

    } catch (error) {
        console.error('Error when inserting data into ClickHouse:', error);
    }
}

export const writeEventsDebounced = debounce(writeEvents, 1000 * 30);

export const result = async (table) => {
    try {
        const query = `SELECT * FROM ${table}`;
        const data = await clickhouse.query(query).toPromise();
        return data;
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        throw error;
    }};