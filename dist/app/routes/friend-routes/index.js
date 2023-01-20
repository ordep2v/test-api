"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const friend_controllers_1 = __importDefault(require("../../controllers/friend-controllers"));
const user_controllers_1 = __importDefault(require("../../controllers/user-controllers"));
const middlewares_1 = __importDefault(require("../../middlewares"));
const friendRouter = (0, express_1.Router)();
const userController = new user_controllers_1.default();
const friendController = new friend_controllers_1.default();
const middlewares = new middlewares_1.default();
friendRouter.post('/login', userController.signIn);
friendRouter.get('/list-friends', middlewares.authVerify, friendController.index);
exports.default = friendRouter;
//# sourceMappingURL=index.js.map