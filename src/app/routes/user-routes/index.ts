import { IRouter, Router } from 'express';
import UserController from '../../controllers/user-controllers';
import Middlewares from '../../middlewares';

const userRouter: IRouter = Router();

const userController = new UserController();
const middlewares = new Middlewares();

userRouter.post('/login', userController.signIn);
userRouter.get('/', middlewares.authVerify, userController.index);

export default userRouter;
