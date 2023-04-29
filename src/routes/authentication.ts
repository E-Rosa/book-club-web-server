import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticationService } from "../services/authenticationService";
import UserRepo from "../repository/userRepo";
import { verify, sign } from "jsonwebtoken";
const prisma = new PrismaClient();

const authenticationRouter = Router();
authenticationRouter
  .route("/login")
  .post(async (req: Request, res: Response) => {
    console.log("POST api/authentication/login");
    try {
      const { email, password } = req.body;
      const hashedPass = AuthenticationService.hashPassword(password);
      const user = await UserRepo.getUserByEmailAndPassword(email, hashedPass);
      const jwt = sign(
        { id: user.id, email: user.email },
        process.env.SECRET_KEY as string
      );
      console.log("login success - " + email);
      res.status(200).send({ jwt: jwt, user:{name: user.name, id: user.id, email: user.email}});
    } catch (error) {
      console.error("login failed - ", error);
      res.status(500).send({error: error});
    }
  });
authenticationRouter
  .route("/signup")
  .post(async (req: Request, res: Response) => {
    console.log("POST api/authentication/signup");
    try {
      const { email, password, name } = req.body;
      const createdUser = await prisma.user.create({
        data: {
          email: email,
          password: AuthenticationService.hashPassword(password),
          name: name,
        },
      });
      console.log("signup success - email: " + createdUser.email);
      res.status(200).send({ message: "ok" });
    } catch (error) {
      console.error("signup failed");
      res.status(500).send({error: error});
    }
  });
export default authenticationRouter;
