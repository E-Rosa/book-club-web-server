"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./src/routes/authentication"));
const book_1 = __importDefault(require("./src/routes/book"));
const admin_1 = __importDefault(require("./src/routes/admin"));
const meeting_1 = __importDefault(require("./src/routes/meeting"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Max-Age", 86400);
    next();
});
app.use("/api/authentication", authentication_1.default);
app.use("/api/books", book_1.default);
app.use("/api/admin", admin_1.default);
app.use("/api/meetings", meeting_1.default);
app.listen(4000, () => {
    console.log("server listening on port 4000");
});
app.all("/", (req, res) => {
    res.sendStatus(404);
});
//# sourceMappingURL=server.js.map