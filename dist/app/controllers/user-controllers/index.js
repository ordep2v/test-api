"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessions = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = require("crypto");
const dotenv_1 = require("dotenv");
const session_1 = __importDefault(require("../../session"));
(0, dotenv_1.config)({
    path: '.env',
});
exports.sessions = {};
class UserController {
    constructor() {
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { login, password } = req.body;
            try {
                if (!login || !password)
                    throw new Error('Preencha todos os campos.');
                if (login !== this.login || password !== this.password)
                    throw new Error('Erro, verifique suas credenciais.');
                const token = (0, crypto_1.randomUUID)();
                const dateNow = new Date();
                const expiresAt = new Date(+dateNow + 120 * 1000);
                const thisSession = new session_1.default(login, expiresAt);
                exports.sessions[token] = thisSession;
                res.cookie('session_token', token, { expires: expiresAt });
                res.status(200).send({ success: true, token }).end();
            }
            catch (e) {
                res.status(401).send({ message: e.message ? e.message : e.response });
            }
        });
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { cookies } = req;
                if (!cookies)
                    throw new Error('Tente novamente.');
                const sessionToken = req.cookies.session_token;
                if (!sessionToken)
                    throw new Error('Tente novamente.');
                const userSession = exports.sessions[sessionToken];
                if (!userSession)
                    throw new Error('Tente novamente.');
                if (userSession.isExpired()) {
                    delete exports.sessions[sessionToken];
                    res.status(401).send({ message: 'Token expirado' }).end();
                }
                else {
                    const { data } = yield axios_1.default.get('https://jsonplaceholder.typicode.com/users');
                    res.status(200).send(data);
                }
            }
            catch (e) {
                res.status(401).send({ message: e.message });
            }
        });
        this.login = process.env.LOGIN;
        this.password = process.env.PASS;
    }
}
exports.default = UserController;
//# sourceMappingURL=index.js.map