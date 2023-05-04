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
            const { id, email, isAdmin } = verifyResult;
            if (!id || !email) {
                throw new Error("authorizationHeader invalid - not ID or email extracted from verify()");
            }
            return { id: id, email: email, isAdmin: isAdmin };
        }
        catch (error) {
            throw new Error('authenticate failed');
        }
    }
    static authenticateAdmin(authorizationHeader) {
        try {
            if (typeof authorizationHeader != "string" || !authorizationHeader.includes("Bearer")) {
                throw new Error("authorizationHeader invalid");
            }
            const token = authorizationHeader.split(" ")[1];
            const verifyResult = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY);
            const { id, email, isAdmin } = verifyResult;
            if (!id || !email) {
                throw new Error("authorizationHeader invalid - not ID or email extracted from verify()");
            }
            if (!isAdmin) {
                throw new Error("authorizationHeader invalid - not admin");
            }
            return { id: id, email: email, isAdmin: isAdmin };
        }
        catch (error) {
            throw new Error('authenticate failed ' + error.message);
        }
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authenticationService.js.map