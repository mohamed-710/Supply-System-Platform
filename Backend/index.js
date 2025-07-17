import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connection from './config/DBconection.js';

import dotenv from 'dotenv';


dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(cors({
//   origin: "http://localhost:3000"
}));

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
