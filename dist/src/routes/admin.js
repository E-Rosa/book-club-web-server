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
const express_1 = require("express");
const authenticationService_1 = require("../services/authenticationService");
const userRepo_1 = __importDefault(require("../repository/userRepo"));
const bookRepo_1 = __importDefault(require("../repository/bookRepo"));
const adminRouter = (0, express_1.Router)();
adminRouter
    .route("/signup/requests")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get unauthorized users
    try {
        console.log("get signup requests started - GET /api/admin/signup/requests");
        const user = authenticationService_1.AuthenticationService.authenticateAdmin(req.headers.authorization);
        console.log("admin authenticated");
        const signupRequests = yield userRepo_1.default.getSignupRequests();
        console.log("getSignupRequests success");
        res.status(200).send(signupRequests);
    }
    catch (error) {
        console.error("get signup requests failed - " + error);
        res
            .status(500)
            .send({ error: "failed to get signup requests - server error" });
    }
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //make unauthorized user into authorized user
    try {
        console.log("accept signup started - PUT /api/admin/signup/requests");
        const user = authenticationService_1.AuthenticationService.authenticateAdmin(req.headers.authorization);
        console.log("admin authenticated");
        const { email } = req.body;
        console.log("email is: ", email);
        const newAuthorizedUser = yield userRepo_1.default.acceptSignup(email);
        console.log("user accepted with success, new user is: " + email);
        res.status(200).send(newAuthorizedUser);
    }
    catch (error) {
        console.error("accept signup failed - " + error);
        res.status(500).send({ error: "failed to accept signup - server error" });
    }
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //delete unauthorized user
    try {
        console.log("delete unauthorized user started - DELETE /api/admin/signup/requests");
        const user = authenticationService_1.AuthenticationService.authenticateAdmin(req.headers.authorization);
        console.log("admin authenticated");
        const { email } = req.body;
        console.log("email is: ", email);
        const deletedUnauthorizedUser = yield userRepo_1.default.deleteUnauthorizedUser(email);
        console.log("user deleted with success, user was: " + email);
        res.status(200).send(deletedUnauthorizedUser);
    }
    catch (error) {
        console.error("delete unauthorized user failed - " + error);
        res
            .status(500)
            .send({ error: "failed to delete unauthorized user - server error" });
    }
}));
adminRouter
    .route("/books/markAsReadByClub")
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //mark book as read by club
    try {
        console.log("mark book as read by club started - PUT /api/admin/books/markAsReadByClub");
        const user = authenticationService_1.AuthenticationService.authenticateAdmin(req.headers.authorization);
        console.log("admin authenticated");
        const { id } = req.body;
        console.log("id is: ", id);
        const bookReadByClub = yield bookRepo_1.default.markBookAsReadByClub(id);
        console.log("book successfuly marked as read by club");
        res.status(200).send(bookReadByClub);
    }
    catch (error) {
        console.error("mark book as read by club failed - " + error);
        res
            .status(500)
            .send({ error: "failed to mark book as read by club - server error" });
    }
}));
adminRouter
    .route("/books/unmarkAsReadByClub")
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //mark book as read by club
    try {
        console.log("unmark book as read by club started - PUT /api/admin/books/markAsReadByClub");
        const user = authenticationService_1.AuthenticationService.authenticateAdmin(req.headers.authorization);
        console.log("admin authenticated");
        const { id } = req.body;
        console.log("id is: ", id);
        const bookReadByClub = yield bookRepo_1.default.unmarkBookAsReadByClub(id);
        console.log("book successfuly unmarked as read by club");
        res.status(200).send(bookReadByClub);
    }
    catch (error) {
        console.error("unmark book as read by club failed - " + error);
        res
            .status(500)
            .send({ error: "failed to unmark book as read by club - server error" });
    }
}));
exports.default = adminRouter;
//# sourceMappingURL=admin.js.map