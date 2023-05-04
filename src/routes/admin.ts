import { Request, Response, Router } from "express";
import { AuthenticationService } from "../services/authenticationService";
import UserRepo from "../repository/userRepo";
import BookRepo from "../repository/bookRepo";

const adminRouter = Router();

adminRouter
  .route("/signup/requests")
  .get(async (req: Request, res: Response) => {
    //get unauthorized users
    try {
      console.log(
        "get signup requests started - GET /api/admin/signup/requests"
      );
      const user = AuthenticationService.authenticateAdmin(
        req.headers.authorization
      );
      console.log("admin authenticated");
      const signupRequests = await UserRepo.getSignupRequests();
      console.log("getSignupRequests success");
      res.status(200).send(signupRequests);
    } catch (error) {
      console.error("get signup requests failed - " + error);
      res
        .status(500)
        .send({ error: "failed to get signup requests - server error" });
    }
  })
  .put(async (req: Request, res: Response) => {
    //make unauthorized user into authorized user
    try {
      console.log("accept signup started - PUT /api/admin/signup/requests");
      const user = AuthenticationService.authenticateAdmin(
        req.headers.authorization
      );
      console.log("admin authenticated");
      const { email } = req.body;
      console.log("email is: ", email);
      const newAuthorizedUser = await UserRepo.acceptSignup(email);
      console.log("user accepted with success, new user is: " + email);
      res.status(200).send(newAuthorizedUser);
    } catch (error) {
      console.error("accept signup failed - " + error);
      res.status(500).send({ error: "failed to accept signup - server error" });
    }
  })
  .delete(async (req: Request, res: Response) => {
    //delete unauthorized user
    try {
      console.log(
        "delete unauthorized user started - DELETE /api/admin/signup/requests"
      );
      const user = AuthenticationService.authenticateAdmin(
        req.headers.authorization
      );
      console.log("admin authenticated");
      const { email } = req.body;
      console.log("email is: ", email);
      const deletedUnauthorizedUser = await UserRepo.deleteUnauthorizedUser(
        email
      );
      console.log("user deleted with success, user was: " + email);
      res.status(200).send(deletedUnauthorizedUser);
    } catch (error) {
      console.error("delete unauthorized user failed - " + error);
      res
        .status(500)
        .send({ error: "failed to delete unauthorized user - server error" });
    }
  });

adminRouter
  .route("/books/markAsReadByClub")
  .put(async (req: Request, res: Response) => {
    //mark book as read by club
    try {
      console.log(
        "mark book as read by club started - PUT /api/admin/books/markAsReadByClub"
      );
      const user = AuthenticationService.authenticateAdmin(
        req.headers.authorization
      );
      console.log("admin authenticated");
      const { id } = req.body;
      console.log("id is: ", id);
      const bookReadByClub = await BookRepo.markBookAsReadByClub(id);
      console.log("book successfuly marked as read by club");
      res.status(200).send(bookReadByClub);
    } catch (error) {
      console.error("mark book as read by club failed - " + error);
      res
        .status(500)
        .send({ error: "failed to mark book as read by club - server error" });
    }
  });
adminRouter
  .route("/books/unmarkAsReadByClub")
  .put(async (req: Request, res: Response) => {
    //mark book as read by club
    try {
      console.log(
        "unmark book as read by club started - PUT /api/admin/books/markAsReadByClub"
      );
      const user = AuthenticationService.authenticateAdmin(
        req.headers.authorization
      );
      console.log("admin authenticated");
      const { id } = req.body;
      console.log("id is: ", id);
      const bookReadByClub = await BookRepo.unmarkBookAsReadByClub(id);
      console.log("book successfuly unmarked as read by club");
      res.status(200).send(bookReadByClub);
    } catch (error) {
      console.error("unmark book as read by club failed - " + error);
      res
        .status(500)
        .send({ error: "failed to unmark book as read by club - server error" });
    }
  });

export default adminRouter;
