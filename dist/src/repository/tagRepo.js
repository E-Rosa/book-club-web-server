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
class TagRepo {
    static createTag(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.tag.create({
                data: { name: name },
            });
        });
    }
    static getTagIdByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.tag.findFirst({
                    where: { name: name },
                    select: { id: true },
                });
                if (result == null) {
                    throw new Error("cant get tag id by name");
                }
                return result.id;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = TagRepo;
//# sourceMappingURL=tagRepo.js.map