import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {syncTables} from './config/DbConnection.js';

import dotenv from 'dotenv';


dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(cors({
//   origin: "http://localhost:3000"
}));

await syncTables()

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
