"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const createServer = app_1.default.listen(process.env.APP_PORT || 3001, () => {
    console.log(`Server online at host:3000.`);
});
exports.default = createServer;
//# sourceMappingURL=server.js.map