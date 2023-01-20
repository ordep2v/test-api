import { Request } from 'express';

interface IUserProps {
  login: string;
  password: string;
  token?: string;
}
interface IUserRequest extends Request {
  user: IUserProps;
  params: {
    userId: string;
  };
  headers: any;
}
