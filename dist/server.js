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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.listen(4000, () => {
    console.log("server listening on port 4000");
});
app.all("/", (req, res) => {
    res.sendStatus(200);
});
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.setTimeout(20000, () => {
        console.log('timeout');
    });
    const { name, email, password } = req.body;
    const newUser = yield prisma.user.create({ data: { name: name, email: email, password: password } });
    yield prisma.$disconnect();
    res.status(200).send(newUser);
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.setTimeout(20000, () => {
        console.log('timeout');
    });
    const users = yield prisma.user.findMany();
    yield prisma.$disconnect();
    res.status(200).send(users);
}));
//# sourceMappingURL=server.js.map