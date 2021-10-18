'reflect-metadata';

import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import AppError from './error/error';
import routes from './routes/routes';

const PORT = 3001;
const app = express();

const optionsCors = {
  origin: ['http://localhost:8080'],
};

app.use(cors(optionsCors));
app.use(express.json());
app.use(routes);

app.use((err: Errors, _request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.status).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
});

app.listen(PORT, () => console.log(`Running in port ${PORT}`));
