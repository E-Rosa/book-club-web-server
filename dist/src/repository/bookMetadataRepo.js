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
class BookMetadataRepo {
    static createBookMetadataAndConnectTags(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookMetadata = yield prisma.bookMetadata.create({
                    data: {
                        authorGender: data.metadata.authorGender,
                        authorNationality: data.metadata.authorNationality,
                        pages: data.metadata.pages,
                        year: data.metadata.year,
                        book: {
                            connect: {
                                title: data.metadata.bookName,
                            },
                        },
                    },
                });
                for (let i = 0; i < data.tags.length; i++) {
                    yield prisma.bookMetadata.update({
                        where: { bookId: bookMetadata.bookId },
                        data: {
                            tags: {
                                connect: {
                                    name: data.tags[i],
                                },
                            },
                        },
                    });
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getBookIdByName(bookName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = yield prisma.book.findFirst({
                    where: { title: bookName },
                    select: { id: true },
                });
                if (bookId == null) {
                    throw new Error("could not get book ID by name");
                }
                return bookId.id;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getAllBookMetadataWithTagsAndBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.bookMetadata.findMany({
                    include: {
                        book: true,
                        tags: true,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getStaticMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const metadata = yield prisma.staticMetadata.findFirst();
                if (metadata == null) {
                    throw new Error("no static metadata found");
                }
                return metadata.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateStaticMetadata(metadataStringfied) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.staticMetadata.update({
                    where: { id: 1 },
                    data: {
                        data: metadataStringfied,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static createBookMetadataFromUserData(metadata, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.bookMetadata.upsert({
                    where: { bookId: bookId },
                    update: {
                        authorGender: metadata.authorGender,
                        authorNationality: metadata.authorNationality,
                        pages: metadata.pages,
                        year: metadata.year,
                        book: {
                            connect: {
                                id: bookId,
                            },
                        },
                    },
                    create: {
                        authorGender: metadata.authorGender,
                        authorNationality: metadata.authorNationality,
                        pages: metadata.pages,
                        year: metadata.year,
                        book: {
                            connect: {
                                id: bookId,
                            },
                        },
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = BookMetadataRepo;
//# sourceMappingURL=bookMetadataRepo.js.map