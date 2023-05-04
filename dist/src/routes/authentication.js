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
const jsonwebtoken_1 = require("jsonwebtoken");
const authenticationRouter = (0, express_1.Router)();
authenticationRouter
    .route("/login")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //login
    console.log("POST api/authentication/login");
    try {
        const { email, password } = req.body;
        console.log(`received - email:${email}, password:${password}`);
        const hashedPass = authenticationService_1.AuthenticationService.hashPassword(password);
        console.log(`generated - hashed password: ${hashedPass}`);
        const user = yield userRepo_1.default.getUserByEmailAndPassword(email, hashedPass);
        console.log(`queried - getUserByEmailAndPassword user: ${JSON.stringify(user)}`);
        const jwt = (0, jsonwebtoken_1.sign)({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.SECRET_KEY);
        console.log(`generated - jwt: ${jwt}`);
        console.log("login success");
        res.status(200).send({
            jwt: jwt,
            user: { name: user.name, id: user.id, email: user.email },
        });
    }
    catch (error) {
        console.error("login failed - ", error);
        res.status(500).send({ error: error });
    }
}));
authenticationRouter
    .route("/signup")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //signup
    console.log("POST api/authentication/signup");
    try {
        const { email, password, name } = req.body;
        const createdUser = yield userRepo_1.default.createUser(email, password, name);
        console.log("signup success - email: " + createdUser.email);
        res.status(200).send({ message: "ok" });
    }
    catch (error) {
        console.error("signup failed - error is: ", error);
        res.status(500).send({ error: error });
    }
}));
authenticationRouter
    .route("/signup/request")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //request an account
    console.log("POST api/authentication/signup/request");
    try {
        const { email, password, name } = req.body;
        yield userRepo_1.default.checkEmailAvailability(email);
        console.log("email available");
        const createdUser = yield userRepo_1.default.createUnauthorizedUser(email, password, name);
        console.log("signup request success - unauthorized user email: " + createdUser.email);
        res.status(200).send({ message: "ok" });
    }
    catch (error) {
        console.error("signup request failed - error is: ", error);
        res.status(500).send({ error: error });
    }
}));
exports.default = authenticationRouter;
//# sourceMappingURL=authentication.js.map