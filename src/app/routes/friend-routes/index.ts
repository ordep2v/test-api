import { IRouter, Router } from 'express';
import FriendController from '../../controllers/friend-controllers';
import UserController from '../../controllers/user-controllers';
import Middlewares from '../../middlewares';

const friendRouter: IRouter = Router();

const userController = new UserController();
const friendController = new FriendController();
const middlewares = new Middlewares();

friendRouter.post('/login', userController.signIn);
friendRouter.get(
  '/list-friends',
  middlewares.authVerify,
  friendController.index,
);

export default friendRouter;
