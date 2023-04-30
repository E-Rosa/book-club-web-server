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
                yield prisma.$disconnect();
                return user;
            }
            catch (error) {
                yield prisma.$disconnect();
                throw new Error("could not get user by email and password");
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
                yield prisma.$disconnect();
                return user;
            }
            catch (error) {
                yield prisma.$disconnect();
                throw new Error("could not get user by email");
            }
        });
    }
}
exports.default = UserRepo;
//# sourceMappingURL=userRepo.js.map