import express, { Express } from 'express';
import cors from 'cors';
import sessions from 'express-session';
import cookieParser from 'cookie-parser';
import userRouter from './app/routes/user-routes';
import friendRouter from './app/routes/friend-routes';

class App {
  public express: Express;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  public middlewares = () => {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
    this.express.use(cookieParser('secret'));
    this.express.use(
      sessions({
        secret: process.env.SECRET,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: false,
      }),
    );
  };

  public routes = () => {
    this.express.use('/api/user', userRouter);
    this.express.use('/api/user', friendRouter);
  };
}
export default new App().express;
