import { Model } from 'objection';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './Routes';

import knex from './start/db';

Model.knex(knex); // Knex config
dotenv.config();

(async () => {
  const app = express();

  app.use(cors({
    credentials: true,
  }));

  app.use(cookieParser);

  app.get('/', (_req, res) => res.send('hello'));

  app.use(router);

  app.listen(process.env.PORT, () => console.log(`Running at ${process.env.PORT} port...`));
})();
