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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const authenticationService_1 = require("../services/authenticationService");
class UserRepo {
    static getUserByEmailAndPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findFirst({
                    where: { email: email, password: password },
                });
                if (user == null) {
                    throw new Error("could not get user by email and password");
                }
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findFirst({
                    where: { email: email },
                });
                if (user == null) {
                    throw new Error("could not get user by email");
                }
                return user;
            }
            catch (error) {
                throw new Error("could not get user by email");
            }
        });
    }
    static createUser(email, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.user.create({
                    data: {
                        email: email,
                        password: authenticationService_1.AuthenticationService.hashPassword(password),
                        name: name,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static createUnauthorizedUser(email, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.unauthorizedUser.create({
                    data: {
                        email: email,
                        password: authenticationService_1.AuthenticationService.hashPassword(password),
                        name: name,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static acceptSignup(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const unauthorizedUser = yield prisma.unauthorizedUser.delete({
                    where: { email: email },
                });
                return yield prisma.user.create({
                    data: {
                        email: email,
                        name: unauthorizedUser.name,
                        password: unauthorizedUser.password,
                        id: unauthorizedUser.id,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static checkEmailAvailability(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isEmailUsed = yield prisma.user.findFirst({
                    where: { email: email },
                });
                if (isEmailUsed != null) {
                    throw new Error("email in use");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    static makeAdmin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.user.update({
                    where: { email: email },
                    data: { isAdmin: true
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getSignupRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.unauthorizedUser.findMany();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteUnauthorizedUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.unauthorizedUser.delete({
                    where: { email: email }
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UserRepo;
//# sourceMappingURL=userRepo.js.map