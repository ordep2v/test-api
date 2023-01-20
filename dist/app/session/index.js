"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Session {
    constructor(username, expiresAt) {
        this.username = username;
        this.expiresAt = expiresAt;
    }
    isExpired() {
        return this.expiresAt < new Date();
    }
}
exports.default = Session;
//# sourceMappingURL=index.js.map