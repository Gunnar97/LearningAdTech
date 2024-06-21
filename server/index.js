import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { debounce } from "wrapperLib/src/debounce.js";
const app = express();
// export express.Router()
// import {router } from './anal_router';
// app.use(router)


app.use(express.static('dist'));
app.get('/', (req, res) => {
    res.send('ok')
})

app.use(cors());
const MAX_CACHE_LEN = 100_000;
const eventsCache = [];
function writeEvents(){

    const events = eventsCache.slice();
    eventsCache.length = 0;
}

const writeEventsDebounced = debounce(writeEvents, 1000 * 60);
app.post('/analytics',bodyParser.json(), (req, res) => {
    const events = req.body;
    //validate

    eventsCache.push(events);
        if(eventsCache.length > MAX_CACHE_LEN){
            writeEvents();
        }else{
             writeEventsDebounced()
        }

    res.status(204).end('');
})


app.get('/analytics', (req, res) => {
    const {startDate,endDate, type, groupBy} = req.query;
    // graph to show events by type , in 24 hours , grouped by hour
    // new events from client:   bid request, bid response, impression      {Bids:[]{bidderCode,unitCode, cpm}}
    res.json(eventsCache)
})


app.listen(8080, () => {
    console.log('Server is running on port 80');
})
