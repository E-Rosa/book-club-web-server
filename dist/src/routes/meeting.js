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
const meetingRepo_1 = __importDefault(require("../repository/meetingRepo"));
const authenticationService_1 = require("../services/authenticationService");
const meetingRouter = (0, express_1.Router)();
meetingRouter.route("/:skip").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get meetings paginated
    console.log("get meetings paginated started - GET /api/meetings/:skip");
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        console.log("user authenticated");
        const paginatedMeetings = yield meetingRepo_1.default.getMeetingsPaginated(parseInt(req.params.skip));
        console.log("got paginated meetings");
        const meetingsCount = yield meetingRepo_1.default.getMeetingsCount();
        console.log("got meetings count");
        res.status(200).send({ meetings: paginatedMeetings, count: meetingsCount });
        console.log("get meetings paginated success");
    }
    catch (error) {
        console.error("failed to get meetings paginated, error: ", error);
        res
            .status(500)
            .send({ error: "failed to get meetings paginated - server error" });
    }
}));
meetingRouter.route("/").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //post meeting
    console.log("post meeting started - POST /api/meetings/");
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        console.log("user authenticated");
        const { hostId, date, bookTitle, address, description } = req.body;
        const postedMeeting = yield meetingRepo_1.default.createMeeting(hostId, new Date(date), bookTitle, address, description);
        console.log("posted meeting");
        res.status(200).send(postedMeeting);
        console.log("post meeting success");
    }
    catch (error) {
        console.error("failed to post meeting, error: ", error);
        res.status(500).send({ error: "failed to post meeting - server error" });
    }
}));
meetingRouter
    .route("/:meetingId")
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //edit meeting
    console.log("edit meeting started - PUT /api/meetings/:meetingId");
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        console.log("user authenticated");
        const { date, bookTitle, address, description } = req.body;
        const updatedMeeting = yield meetingRepo_1.default.editMeeting(req.params.meetingId, new Date(date), bookTitle, address, description);
        console.log("updated meeting");
        res.status(200).send(updatedMeeting);
        console.log("edit meeting success");
    }
    catch (error) {
        console.error("failed to edit meeting, error: ", error);
        res.status(500).send({ error: "failed to edit meeting - server error" });
    }
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //delete meeting
    console.log("delete meeting started - PUT /api/meetings/:meetingId");
    try {
        const user = authenticationService_1.AuthenticationService.authenticate(req.headers.authorization);
        console.log("user authenticated");
        const deletedMeeting = yield meetingRepo_1.default.deleteMeeting(req.params.meetingId);
        console.log("deleted meeting");
        res.status(200).send(deletedMeeting);
        console.log("delete meeting success");
    }
    catch (error) {
        console.error("failed to delete meeting, error: ", error);
        res
            .status(500)
            .send({ error: "failed to delete meeting - server error" });
    }
}));
exports.default = meetingRouter;
//# sourceMappingURL=meeting.js.map