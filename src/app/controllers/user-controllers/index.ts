import axios from 'axios';
import { randomUUID } from 'crypto';
import { config } from 'dotenv';
import { Request, Response } from 'express';
import Session from '../../session';
import { IUserProps } from '../../utils/types';

config({
  path: '.env',
});
export const sessions = {};

class UserController {
  private login: string;

  private password: string;

  constructor() {
    this.login = process.env.LOGIN;
    this.password = process.env.PASS;
  }

  public signIn = async (req: Request, res: Response): Promise<void> => {
    const { login, password } = req.body as IUserProps;
    try {
      if (!login || !password) throw new Error('Preencha todos os campos.');

      if (login !== this.login || password !== this.password)
        throw new Error('Erro, verifique suas credenciais.');

      const token = randomUUID();

      const dateNow = new Date();
      const expiresAt = new Date(+dateNow + 120 * 1000);

      const thisSession = new Session(login, expiresAt);

      sessions[token] = thisSession;
      res.cookie('session_token', token, { expires: expiresAt });
      res.status(200).send({ success: true, token }).end();
    } catch (e: any) {
      res.status(401).send({ message: e.message ? e.message : e.response });
    }
  };

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cookies } = req;
      if (!cookies) throw new Error('Tente novamente.');
      const sessionToken = req.cookies.session_token;
      if (!sessionToken) throw new Error('Tente novamente.');
      const userSession = sessions[sessionToken];
      if (!userSession) throw new Error('Tente novamente.');
      if (userSession.isExpired()) {
        delete sessions[sessionToken];
        res.status(401).send({ message: 'Token expirado' }).end();
      } else {
        const { data } = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        );
        res.status(200).send(data);
      }
    } catch (e: any) {
      res.status(401).send({ message: e.message });
    }
  };
}

export default UserController;
