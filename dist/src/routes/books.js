"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticationService_1 = require("../services/authenticationService");
const express_1 = require("express");
const booksRouter = (0, express_1.Router)();
booksRouter.route("/")
    .get((req, res) => {
    try {
        authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        res.sendStatus(200);
    }
    catch (error) {
        console.error("get books failed - " + error);
        res.status(500).send({ error: "failed to get books - server error" });
    }
});
exports.default = booksRouter;
//# sourceMappingURL=books.js.map