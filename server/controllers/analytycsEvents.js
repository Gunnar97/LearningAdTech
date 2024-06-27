// import clickhouse from "../clickhouse/clickhouse.js";
// import { debounce } from "wrapperLib/src/debounce.js";
// import { v4 as uuidv4 } from 'uuid'; // Используем библиотеку для генерации UUID
//
// export const eventsCacheEvent = [];
//
// const MAX_RETRIES = 3;
// const RETRY_DELAY_MS = 1000;
//
// export async function writeEventsEvent(retries = 0) {
//     const events = eventsCacheEvent.slice();
//     eventsCacheEvent.length = 0;
//
//     const values = events.map(event => {
//         const { eventType, time, bidderCode, unitCode, cpm } = event;
//         return `('${eventType}', ${time}, '${bidderCode}', '${unitCode}', ${cpm})`;
//     }).join(',');
//
//     const sessionId = uuidv4();
//
//     try {
//         await clickhouse.query(`
//             INSERT INTO analytics_events (eventType, time, bidderCode, unitCode, cpm)
//             VALUES ${values}
//             `, { session_id: sessionId }).toPromise();
//     } catch (error) {
//         if (error.code === 373 && retries < MAX_RETRIES) { // SESSION_IS_LOCKED
//             console.log(`Попытка ${retries + 1} из-за заблокированной сессии...`);
//             setTimeout(() => writeEventsEvent(retries + 1), RETRY_DELAY_MS);
//         } else {
//             console.error('Ошибка при вставке событий в ClickHouse (analytics_event):', error);
//         }
//     }
// }
//
//
// export const writeEventsEventDebounced = debounce(writeEventsEvent, 1000 * 60);
//
//
// export const resultEvent = () => clickhouse.query(`
//     SELECT * FROM analytics_event
// `).toPromise();