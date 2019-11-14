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

  app.use(express.json());
  app.use(cookieParser());

  app.get('/', (_req, res) => res.send('hello'));

  app.use(router);

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.log(err.stack);
    res.json({
      errors: {
        message: err.message,
        error: +process.env.PRODUCTION ? null : err,
      },
    });
  });

  app.listen(process.env.PORT, () => console.log(`Running at ${process.env.PORT} port...`));
})();
