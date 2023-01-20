"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controllers_1 = __importStar(require("../controllers/user-controllers"));
class Middlewares {
    constructor() {
        this.authVerify = (req, res, next) => {
            try {
                const { cookies } = req;
                if (!cookies)
                    throw new Error('Não permitido.');
                const sessionToken = req.headers.token;
                if (!sessionToken)
                    throw new Error('Não permitido.');
                const userSession = user_controllers_1.sessions[sessionToken];
                if (!userSession)
                    throw new Error('Não permitido.');
                if (userSession.isExpired()) {
                    delete user_controllers_1.sessions[sessionToken];
                    throw new Error('Token inválido.');
                }
                next();
            }
            catch (e) {
                res.status(401).send({ e: e.message });
            }
        };
        this.userController = new user_controllers_1.default();
    }
}
exports.default = Middlewares;
//# sourceMappingURL=index.js.map