import { Request, Response, Router } from "express";
import MeetingRepo from "../repository/meetingRepo";
import { AuthenticationService } from "../services/authenticationService";

const meetingRouter = Router();

meetingRouter.route("/:skip").get(async (req: Request, res: Response) => {
  //get meetings paginated
  console.log("get meetings paginated started - GET /api/meetings/:skip");
  try {
    const user = AuthenticationService.authenticate(req.headers.authorization);
    console.log("user authenticated");
    const paginatedMeetings = await MeetingRepo.getMeetingsPaginated(
      parseInt(req.params.skip)
    );
    console.log("got paginated meetings");
    const meetingsCount = await MeetingRepo.getMeetingsCount();
    console.log("got meetings count");
    res.status(200).send({ meetings: paginatedMeetings, count: meetingsCount });
    console.log("get meetings paginated success");
  } catch (error) {
    console.error("failed to get meetings paginated, error: ", error);
    res
      .status(500)
      .send({ error: "failed to get meetings paginated - server error" });
  }
});

meetingRouter.route("/").post(async (req: Request, res: Response) => {
  //post meeting
  console.log("post meeting started - POST /api/meetings/");
  try {
    const user = AuthenticationService.authenticate(req.headers.authorization);
    console.log("user authenticated");
    const { hostId, date, bookTitle, address, description } = req.body;
    const postedMeeting = await MeetingRepo.createMeeting(
      hostId,
      new Date(date),
      bookTitle,
      address,
      description
    );
    console.log("posted meeting");
    res.status(200).send(postedMeeting);
    console.log("post meeting success");
  } catch (error) {
    console.error("failed to post meeting, error: ", error);
    res.status(500).send({ error: "failed to post meeting - server error" });
  }
});

meetingRouter
  .route("/:meetingId")
  .put(async (req: Request, res: Response) => {
    //edit meeting
    console.log("edit meeting started - PUT /api/meetings/:meetingId");
    try {
      const user = AuthenticationService.authenticate(
        req.headers.authorization
      );
      console.log("user authenticated");
      const { date, bookTitle, address, description } = req.body;
      const updatedMeeting = await MeetingRepo.editMeeting(
        req.params.meetingId,
        new Date(date),
        bookTitle,
        address,
        description
      );
      console.log("updated meeting");
      res.status(200).send(updatedMeeting);
      console.log("edit meeting success");
    } catch (error) {
      console.error("failed to edit meeting, error: ", error);
      res.status(500).send({ error: "failed to edit meeting - server error" });
    }
  })
  .delete(async (req: Request, res: Response) => {
    //delete meeting
    console.log("delete meeting started - PUT /api/meetings/:meetingId");
    try {
      const user = AuthenticationService.authenticate(
        req.headers.authorization
      );
      console.log("user authenticated");

      const deletedMeeting = await MeetingRepo.deleteMeeting(
        req.params.meetingId
      );
      console.log("deleted meeting");
      res.status(200).send(deletedMeeting);
      console.log("delete meeting success");
    } catch (error) {
      console.error("failed to delete meeting, error: ", error);
      res
        .status(500)
        .send({ error: "failed to delete meeting - server error" });
    }
  });

export default meetingRouter;
