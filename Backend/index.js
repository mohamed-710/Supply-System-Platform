import express from 'express';

import cors from 'cors';

import cookieParser from 'cookie-parser';

import {syncTables} from './config/DbConnection.js';

import ErrorHandler from './middleware/ErrorHandler.js';

import dotenv from 'dotenv';


dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use(cookieParser());


app.use(cors({
//   origin: "http://localhost:3000"
}));

app.use(ErrorHandler);
await syncTables()


app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
