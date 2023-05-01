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
const prisma_1 = __importDefault(require("./prisma"));
class BookRepo {
    static getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield prisma_1.default.book.findMany({
                    include: {
                        voters: {
                            select: {
                                name: true,
                                email: true,
                                id: true,
                            },
                        },
                    },
                });
                return book;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static postBook(postAuthorId, title, author) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield prisma_1.default.book.create({
                    data: {
                        postAuthorId: postAuthorId,
                        title: title,
                        author: author,
                        voters: {
                            connect: { id: postAuthorId },
                        },
                    },
                });
                return book;
            }
            catch (error) {
                throw new Error("postBook failed - " + error);
            }
        });
    }
    static voteOnBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield prisma_1.default.book.update({
                    where: {
                        id: bookId,
                    },
                    data: {
                        voters: {
                            connect: { id: userId },
                        },
                    },
                });
                return book;
            }
            catch (error) {
                throw new Error("voteOnBook failed - " + error);
            }
        });
    }
    static unvoteOnBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield prisma_1.default.book.update({
                    where: {
                        id: bookId,
                    },
                    data: {
                        voters: {
                            disconnect: { id: userId },
                        },
                    },
                });
                return book;
            }
            catch (error) {
                throw new Error("unvoteOnBook failed - " + error);
            }
        });
    }
}
exports.default = BookRepo;
//# sourceMappingURL=bookRepo.js.map