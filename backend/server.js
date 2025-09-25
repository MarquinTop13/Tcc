import axios from "axios";
import cors from "cors";
import express from 'express';


const port = 5010;
const api = express();
api.use(express.json());


api.listen(port, () => console.log(`PORTA: ${port}`))