import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app: express.Application = express();
const version: string = process.env.VERSION || '/api/v1';

import healthRouter from './routes/health';
import userRouter from './routes/user';
import openaiRouter from './routes/openai';

app.use(cors());

app.use(express.json());

app.use(`${version}/health`, healthRouter);
app.use(`${version}/user`, userRouter);
app.use(`${version}/openai`, openaiRouter);

export default app;
