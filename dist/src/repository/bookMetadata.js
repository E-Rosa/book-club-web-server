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
    static createBookMetadata(metadata, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookMetadata = yield prisma.bookMetadata.create({
                    data: Object.assign({}, metadata)
                });
                for (let i = 0; i < tags.length; i++) {
                    yield prisma.bookMetadata.update({
                        where: { bookId: bookMetadata.bookId },
                        data: {
                            tags: {
                                connect: {
                                    id: tags[i].id
                                }
                            }
                        }
                    });
                }
            }
            catch (error) {
            }
        });
    }
}
exports.default = BookMetadataRepo;
//# sourceMappingURL=bookMetadata.js.map