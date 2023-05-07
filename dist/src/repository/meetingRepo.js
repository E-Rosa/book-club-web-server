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
class MeetingRepo {
    static createMeeting(hostId, date, bookTitle, address, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.meeting.create({
                    data: {
                        hostId: hostId,
                        date: date,
                        bookTitle: bookTitle,
                        address: address,
                        description: description,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getMeetingsPaginated(skip) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.meeting.findMany({
                    skip: skip,
                    take: 10,
                    orderBy: {
                        date: "desc",
                    },
                    include: {
                        participants: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                        host: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getMeetingsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.meeting.count();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static editMeeting(id, date, bookTitle, address, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.meeting.update({
                    where: { id: id },
                    data: {
                        date: date,
                        bookTitle: bookTitle,
                        address: address,
                        description: description,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteMeeting(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.meeting.delete({
                    where: { id: id }
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = MeetingRepo;
//# sourceMappingURL=meetingRepo.js.map