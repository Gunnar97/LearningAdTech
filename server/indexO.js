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




app.listen(8080, () => {
    console.log('Server is running on port 80');
})
