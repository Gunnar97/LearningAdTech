import express from 'express';
import cors from "cors";
import serverRoutes from "./routes/servers.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
app.use(serverRoutes);




app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT} ...`)
})