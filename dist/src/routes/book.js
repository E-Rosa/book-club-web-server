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
const bookRouter = (0, express_1.Router)();
bookRouter
    .route("/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const books = yield bookRepo_1.default.getBooks();
        console.log("get books success");
        res.status(200).send(books);
    }
    catch (error) {
        console.error("get books failed - " + error);
        res.status(500).send({ error: "failed to get books - server error" });
    }
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        const { postAuthorId, title, author } = req.body;
        const book = yield bookRepo_1.default.postBook(postAuthorId, title, author);
        console.log("post book success - " + book.title);
        res.status(200).send(book);
    }
    catch (error) {
        console.error("post book failed - " + error);
        res.status(500).send({ error: "failed to post books - server error" });
    }
}));
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
exports.default = bookRouter;
//# sourceMappingURL=book.js.map