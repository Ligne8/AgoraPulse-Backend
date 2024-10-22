import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app: express.Application = express();

import healthRouter from './routes/health';
import userRouter from './routes/user';
import TagsRouter from './routes/tags';

app.use(cors());

app.use(express.json());

app.use('/health', healthRouter);
app.use('/user', userRouter);
app.use('/tags', TagsRouter);

export default app;
