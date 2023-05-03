"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const crypto_1 = require("crypto");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthenticationService {
    static hashPassword(password) {
        return (0, crypto_1.createHash)("sha256")
            .update(password + process.env.SECRET_KEY)
            .digest("hex");
    }
    static authenticate(authorizationHeader) {
        try {
            if (typeof authorizationHeader != "string" || !authorizationHeader.includes("Bearer")) {
                throw new Error("authorizationHeader invalid");
            }
            const token = authorizationHeader.split(" ")[1];
            const verifyResult = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY);
            const { id, email } = verifyResult;
            if (!id || !email) {
                throw new Error("authorizationHeader invalid - not ID or email extracted from verify()");
            }
            return { id: id, email: email };
        }
        catch (error) {
            throw new Error('authenticate failed');
        }
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authenticationService.js.map