import { NextFunction, Response } from 'express';
import UserController, { sessions } from '../controllers/user-controllers';
import { IUserRequest } from '../utils/types';

class Middlewares {
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
  }

  public authVerify = (
    req: IUserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { cookies } = req;
      if (!cookies) throw new Error('Não permitido.');
      const sessionToken = req.headers.token;
      if (!sessionToken) throw new Error('Não permitido.');
      const userSession = sessions[sessionToken];
      if (!userSession) throw new Error('Não permitido.');
      if (userSession.isExpired()) {
        delete sessions[sessionToken];
        throw new Error('Token inválido.');
      }
      next();
    } catch (e) {
      res.status(401).send({ e: e.message });
    }
  };
}

export default Middlewares;
