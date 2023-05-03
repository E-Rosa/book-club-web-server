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
class BookRepo {
    static getBooksWithVoters() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield prisma.book.findMany({
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
    static getBooksWithReaders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield prisma.book.findMany({
                    where: {
                        isRead: true
                    },
                    include: {
                        readers: {
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
                const book = yield prisma.book.create({
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
                const book = yield prisma.book.update({
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
                const book = yield prisma.book.update({
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
    static readBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield prisma.book.update({
                    where: {
                        id: bookId,
                    },
                    data: {
                        readers: {
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
    static unreadBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield prisma.book.update({
                    where: {
                        id: bookId,
                    },
                    data: {
                        readers: {
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
    static updateBook(bookId, author, title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedBook = yield prisma.book.update({
                    where: {
                        id: bookId,
                    },
                    data: {
                        author: author,
                        title: title
                    },
                });
                return updatedBook;
            }
            catch (error) {
                throw new Error("updateBook failed - " + error);
            }
        });
    }
}
exports.default = BookRepo;
//# sourceMappingURL=bookRepo.js.map