import express from 'express';
import cors from 'cors';
import { AddRotas } from './router.js';

const api = express();
api.use(cors());
api.use(express.json());

AddRotas(api);

api.listen(5000, () => console.log('API subiu com sucesso!'));