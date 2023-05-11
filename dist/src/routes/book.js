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
const authenticationService_1 = require("../services/authenticationService");
const express_1 = require("express");
const bookRepo_1 = __importDefault(require("../repository/bookRepo"));
const dataGenerationService_1 = __importDefault(require("../services/dataGenerationService"));
const bookMetadataRepo_1 = __importDefault(require("../repository/bookMetadataRepo"));
const tagRepo_1 = __importDefault(require("../repository/tagRepo"));
const bookRouter = (0, express_1.Router)();
//post a book
bookRouter
    .route("/")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const { postAuthorId, title, author, description } = req.body;
        const book = yield bookRepo_1.default.postBook(postAuthorId, title, author, description);
        console.log("post book success - " + book.title);
        res.status(200).send(book);
    }
    catch (error) {
        console.error("post book failed - " + error);
        res.status(500).send({ error: "failed to post books - server error" });
    }
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //edit a book
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const { author, title, id, description } = req.body;
        const updatedBook = yield bookRepo_1.default.updateBook(id, author, title, description);
        console.log("update book success\n book: " + title + " \n user: " + user.email);
        res.status(200).send(updatedBook);
    }
    catch (error) {
        console.error("update book failed - " + error);
        res.status(500).send({ error: "failed to update book - server error" });
    }
}));
//get suggested books
bookRouter.route("/suggested").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const books = yield bookRepo_1.default.getBooksWithVoters();
        console.log("get suggested books success");
        res.status(200).send(books);
    }
    catch (error) {
        console.error("get suggested books failed - " + error);
        res
            .status(500)
            .send({ error: "failed to get suggested books - server error" });
    }
}));
//get suggested books paginated
bookRouter
    .route("/suggested/:skip")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const books = yield bookRepo_1.default.getBooksWithVotersPaginated(parseInt(req.params.skip));
        console.log("get suggested books paginated success");
        const suggestedBooksQuantity = yield bookRepo_1.default.getQuantityOfBooksSuggested();
        console.log("got quantity of books suggested: ", suggestedBooksQuantity);
        res.status(200).send({ books: books, count: suggestedBooksQuantity });
    }
    catch (error) {
        console.error("get suggested books paginated failed - " + error);
        res.status(500).send({
            error: "failed to get suggested books paginated - server error",
        });
    }
}));
//get personal suggested books paginated
bookRouter
    .route("/:userId/suggested/:skip")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const books = yield bookRepo_1.default.getPersonalSuggestestionWithVotersPaginated(parseInt(req.params.skip), req.params.userId);
        console.log("get personal suggested books paginated success");
        const suggestedBooksQuantity = yield bookRepo_1.default.getQuantityOfPersonalBooksSuggested(req.params.userId);
        console.log("got quantity of books suggested: ", suggestedBooksQuantity);
        res.status(200).send({ books: books, count: suggestedBooksQuantity });
    }
    catch (error) {
        console.error("get personal suggested books paginated failed - " + error);
        res.status(500).send({
            error: "failed to get personal suggested books paginated - server error",
        });
    }
}));
//get read books
bookRouter.route("/read").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const books = yield bookRepo_1.default.getBooksWithReaders();
        console.log("get read books success");
        res.status(200).send(books);
    }
    catch (error) {
        console.error("get read books failed - " + error);
        res.status(500).send({ error: "failed to get read books - server error" });
    }
}));
//get read books paginated
bookRouter.route("/read/:skip").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const books = yield bookRepo_1.default.getBooksWithReadersPaginated(parseInt(req.params.skip));
        console.log("get read books paginated success");
        const readBooksQuantity = yield bookRepo_1.default.getQuantityOfBooksReadByClub();
        console.log("got quantity of books read by club: ", readBooksQuantity);
        res.status(200).send({ books: books, count: readBooksQuantity });
    }
    catch (error) {
        console.error("get read books paginated failed - " + error);
        res
            .status(500)
            .send({ error: "failed to get read books paginated - server error" });
    }
}));
//unvote on book
bookRouter.route("/unvote/:id").put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const bookId = req.params.id;
        const book = yield bookRepo_1.default.unvoteOnBook(user.id, bookId);
        console.log("unvote on book success\n book: " + book.title + " \n user: " + user.email);
        res.status(200).send(book);
    }
    catch (error) {
        console.error("unvote on book failed - " + error);
        res.status(500).send({ error: "failed to unvote on books - server error" });
    }
}));
//vote on book
bookRouter.route("/vote/:id").put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const bookId = req.params.id;
        const book = yield bookRepo_1.default.voteOnBook(user.id, bookId);
        console.log("vote on book success\n book: " + book.title + " \n user: " + user.email);
        res.status(200).send(book);
    }
    catch (error) {
        console.error("vote on book failed - " + error);
        res.status(500).send({ error: "failed to vote on books - server error" });
    }
}));
//mark book as read
bookRouter.route("/read/:id").put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const bookId = req.params.id;
        const book = yield bookRepo_1.default.readBook(user.id, bookId);
        console.log("mark as read success\n book: " + book.title + " \n user: " + user.email);
        res.status(200).send(book);
    }
    catch (error) {
        console.error("mark as read failed - " + error);
        res.status(500).send({ error: "failed to mark as read - server error" });
    }
}));
//mark book as unread
bookRouter.route("/unread/:id").put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const bookId = req.params.id;
        const book = yield bookRepo_1.default.unreadBook(user.id, bookId);
        console.log("mark book as unread success\n book: " +
            book.title +
            " \n user: " +
            user.email);
        res.status(200).send(book);
    }
    catch (error) {
        console.error("mark book as unread failed - " + error);
        res
            .status(500)
            .send({ error: "failed to mark book as unread - server error" });
    }
}));
//get book statistics
bookRouter
    .route("/statistics")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("trying to get statistics");
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        console.log("user authenticated");
        const statistics = yield bookMetadataRepo_1.default.getStaticMetadata();
        console.log("get statistics success");
        res.status(200).send(statistics);
    }
    catch (error) {
        console.error("get statistics failed - " + error);
        res
            .status(500)
            .send({ error: "failed to get statistics - server error" });
    }
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //update static book metadata table
    try {
        console.log("trying to get statistics");
        authenticationService_1.AuthenticationService.authenticateAdmin(req.headers.authorization);
        console.log("admin authenticated");
        const updatedStatistics = JSON.stringify(yield dataGenerationService_1.default.getBookStatistics());
        console.log("get updated statistics success");
        yield bookMetadataRepo_1.default.updateStaticMetadata(updatedStatistics);
        console.log("update static metadata success");
        res.sendStatus(200);
    }
    catch (error) {
        console.error("update static book metadata failed - " + error);
        res
            .status(500)
            .send({
            error: "failed to update static book metadata - server error",
        });
    }
}));
//post book metadata
bookRouter
    .route("/metadata/:bookId")
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const { year, pages, authorNationality, authorGender, tags } = req.body;
        const bookMetadata = yield bookMetadataRepo_1.default.createBookMetadataFromUserData({
            year: year,
            pages: pages,
            authorGender: authorGender,
            authorNationality: authorNationality,
            tags: tags
        }, req.params.bookId);
        res.status(200).send(bookMetadata);
    }
    catch (error) {
        console.error("post book metadata failed - " + error);
        res.status(500).send({ error: "failed to post book metadata - server error" });
    }
}));
//post tags
bookRouter
    .route("/metadata/tags")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("/api/books/metadata/tags");
        console.log("started to post tags");
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        console.log("user authenticated");
        const { tags } = req.body;
        tags.forEach((tag) => __awaiter(void 0, void 0, void 0, function* () {
            yield tagRepo_1.default.createTag(tag);
        }));
        console.log("tags created - success");
        res.status(200);
    }
    catch (error) {
        console.error("post tags failed - " + error);
        res.status(500).send({ error: "failed to post tags - server error" });
    }
}));
//cron job: get updated metadata and update static metadata
bookRouter.route("/cron").put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMetadata = JSON.stringify(yield dataGenerationService_1.default.getBookStatistics());
        const newStaticMetadata = yield bookMetadataRepo_1.default.updateStaticMetadata(newMetadata);
        res.status(200).send(newStaticMetadata.data);
    }
    catch (error) {
        console.error("get and update metadata failed - " + error);
        res
            .status(500)
            .send({ error: "failed to get and update metadata - server error" });
    }
}));
exports.default = bookRouter;
//# sourceMappingURL=book.js.map