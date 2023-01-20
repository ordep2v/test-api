"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = __importDefault(require("../../controllers/user-controllers"));
const middlewares_1 = __importDefault(require("../../middlewares"));
const userRouter = (0, express_1.Router)();
const userController = new user_controllers_1.default();
const middlewares = new middlewares_1.default();
userRouter.post('/login', userController.signIn);
userRouter.get('/', middlewares.authVerify, userController.index);
exports.default = userRouter;
//# sourceMappingURL=index.js.map