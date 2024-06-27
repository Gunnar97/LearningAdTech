import { Router } from 'express';
import bodyParser from "body-parser";
import {eventsCache, result, writeEvents, writeEventsDebounced} from "../controllers/analytics.js";


const router = Router();



router.get('/', (req, res) => {
    res.send('okk')
})



router.post('/analytics', bodyParser.json(), (req, res) => {
    const events = req.body;

    if (!Array.isArray(events)) {
        return res.status(400).send('Invalid events format');
    }

    const maxCacheLength = parseInt(process.env.MAX_CACHE_LENGTH, 10) || 1000;

    eventsCache.push(...events);
    if (eventsCache.length >= maxCacheLength) {
        writeEvents();
    } else {
        writeEventsDebounced();
    }
    res.status(200).send(req.body);
});


router.get('/analytics', async (req, res) => {
    try {
       const getResult = await result('analytics')
        res.status(200).json(getResult);
    } catch (error) {
        console.error('Error fetching events from ClickHouse:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/pbjsAnalytics', async (req, res) => {
    try {
       const getResult = await result('analytics_events')
        res.status(200).json(getResult);
    } catch (error) {
        console.error('Error fetching events from ClickHouse:', error);
        res.status(500).send('Internal Server Error');
    }
});



export default router;