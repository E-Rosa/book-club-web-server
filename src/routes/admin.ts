import { Request, Response, Router } from "express";
import { AuthenticationService } from "../services/authenticationService";
import UserRepo from "../repository/userRepo";

const adminRouter = Router();

adminRouter
  .route("/singup/requests")
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
      console.log("delete unauthorized user started - DELETE /api/admin/signup/requests");
      const user = AuthenticationService.authenticateAdmin(
        req.headers.authorization
      );
      console.log("admin authenticated");
      const { email } = req.body;
      const deletedUnauthorizedUser = await UserRepo.deleteUnauthorizedUser(email);
      console.log("user deleted with success, user was: " + email);
      res.status(200).send(deletedUnauthorizedUser);
    } catch (error) {
      console.error("delete unauthorized user failed - " + error);
      res.status(500).send({ error: "failed to delete unauthorized user - server error" });
    }
  })

export default adminRouter;
