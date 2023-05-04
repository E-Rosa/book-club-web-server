import { Request, Response, Router } from "express";
import { AuthenticationService } from "../services/authenticationService";
import UserRepo from "../repository/userRepo";
import { sign } from "jsonwebtoken";

const authenticationRouter = Router();
authenticationRouter
  .route("/login")
  .post(async (req: Request, res: Response) => {
    //login
    console.log("POST api/authentication/login");
    try {
      const { email, password } = req.body;
      console.log(`received - email:${email}, password:${password}`);
      const hashedPass = AuthenticationService.hashPassword(password);
      console.log(`generated - hashed password: ${hashedPass}`);
      const user = await UserRepo.getUserByEmailAndPassword(email, hashedPass);
      console.log(
        `queried - getUserByEmailAndPassword user: ${JSON.stringify(user)}`
      );
      const jwt = sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin },
        process.env.SECRET_KEY as string
      );
      console.log(`generated - jwt: ${jwt}`);
      console.log("login success");
      res.status(200).send({
        jwt: jwt,
        user: { name: user.name, id: user.id, email: user.email, isAdmin:user.isAdmin },
      });
    } catch (error) {
      console.error("login failed - ", error);
      res.status(500).send({ error: error });
    }
  });
authenticationRouter
  .route("/signup")
  .post(async (req: Request, res: Response) => {
    //signup
    console.log("POST api/authentication/signup");
    try {
      const { email, password, name } = req.body;
      const createdUser = await UserRepo.createUser(email, password, name);
      console.log("signup success - email: " + createdUser.email);
      res.status(200).send({ message: "ok" });
    } catch (error) {
      console.error("signup failed - error is: ", error);
      res.status(500).send({ error: error });
    }
  });
authenticationRouter
  .route("/signup/request")
  .post(async (req: Request, res: Response) => {
    //request an account
    console.log("POST api/authentication/signup/request");
    try {
      const { email, password, name } = req.body;
      await UserRepo.checkEmailAvailability(email);
      console.log("email available");
      const createdUser = await UserRepo.createUnauthorizedUser(
        email,
        password,
        name
      );
      console.log(
        "signup request success - unauthorized user email: " + createdUser.email
      );
      res.status(200).send({ message: "ok" });
    } catch (error) {
      console.error("signup request failed - error is: ", error);
      res.status(500).send({ error: error });
    }
  });
export default authenticationRouter;
