import { AuthenticationService } from "../services/authenticationService";
import { Request, Response, Router } from "express";
import BookRepo from "../repository/bookRepo";

const bookRouter = Router();

bookRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    try {
      const user = AuthenticationService.authenticate(
        req.headers.authorization
      );
      const books = await BookRepo.getBooks();
      console.log("get books success");
      res.status(200).send(books);
    } catch (error) {
      console.error("get books failed - " + error);
      res.status(500).send({ error: "failed to get books - server error" });
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const user = AuthenticationService.authenticate(
        req.headers.authorization
      );
      const { postAuthorId, title, author } = req.body;
      const book = await BookRepo.postBook(postAuthorId, title, author);
      console.log("post book success - " + book.title);
      res.status(200).send(book);
    } catch (error) {
      console.error("post book failed - " + error);
      res.status(500).send({ error: "failed to post books - server error" });
    }
  });
bookRouter.route("/unvote/:id").put(async (req: Request, res: Response) => {
  try {
    const user = AuthenticationService.authenticate(req.headers.authorization);
    const bookId = req.params.id;
    const book = await BookRepo.unvoteOnBook(user.id, bookId);
    console.log(
      "unvote on book success\n book: " + book.title + " \n user: " + user.email
    );
    res.status(200).send(book);
  } catch (error) {
    console.error("unvote on book failed - " + error);
    res.status(500).send({ error: "failed to unvote on books - server error" });
  }
});

bookRouter.route("/vote/:id").put(async (req: Request, res: Response) => {
  try {
    const user = AuthenticationService.authenticate(req.headers.authorization);
    const bookId = req.params.id;
    const book = await BookRepo.voteOnBook(user.id, bookId);
    console.log(
      "vote on book success\n book: " + book.title + " \n user: " + user.email
    );
    res.status(200).send(book);
  } catch (error) {
    console.error("vote on book failed - " + error);
    res.status(500).send({ error: "failed to vote on books - server error" });
  }
});

export default bookRouter;
