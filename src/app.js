import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import { corsOptions } from './config/cors.js';

const app = express();

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' })); 

app.use('/api', routes); 

export default app;
