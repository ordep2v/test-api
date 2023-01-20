"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = __importDefault(require("./app/routes/user-routes"));
const friend_routes_1 = __importDefault(require("./app/routes/friend-routes"));
class App {
    constructor() {
        this.middlewares = () => {
            this.express.use(express_1.default.json());
            this.express.use(express_1.default.urlencoded({ extended: true }));
            this.express.use((0, cors_1.default)());
            this.express.use((0, cookie_parser_1.default)('secret'));
            this.express.use((0, express_session_1.default)({
                secret: process.env.SECRET,
                saveUninitialized: true,
                cookie: { maxAge: 1000 * 60 * 60 * 24 },
                resave: false,
            }));
        };
        this.routes = () => {
            this.express.use('/api/user', user_routes_1.default);
            this.express.use('/api/user', friend_routes_1.default);
        };
        this.express = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map