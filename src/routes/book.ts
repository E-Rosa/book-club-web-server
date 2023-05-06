import { AuthenticationService } from "../services/authenticationService";
import { Request, Response, Router } from "express";
import BookRepo from "../repository/bookRepo";

const bookRouter = Router();

//post a book
bookRouter
  .route("/")
  .post(async (req: Request, res: Response) => {
    try {
      const user = AuthenticationService.authenticate(
        req.headers.authorization
      );
      const { postAuthorId, title, author, description } = req.body;
      const book = await BookRepo.postBook(postAuthorId, title, author, description);
      console.log("post book success - " + book.title);
      res.status(200).send(book);
    } catch (error) {
      console.error("post book failed - " + error);
      res.status(500).send({ error: "failed to post books - server error" });
    }
  })
  .put(async (req: Request, res: Response) => {
    //edit a book
    try {
      const user = AuthenticationService.authenticate(
        req.headers.authorization
      );
      const { author, title, id, description } = req.body;
      const updatedBook = await BookRepo.updateBook(
        id,
        author,
        title,
        description
      );
      console.log(
        "update book success\n book: " + title + " \n user: " + user.email
      );
      res.status(200).send(updatedBook);
    } catch (error) {
      console.error("update book failed - " + error);
      res.status(500).send({ error: "failed to update book - server error" });
    }
  });

//get suggested books
bookRouter.route("/suggested").get(async (req: Request, res: Response) => {
  try {
    const user = AuthenticationService.authenticate(req.headers.authorization);
    const books = await BookRepo.getBooksWithVoters();
    console.log("get suggested books success");
    res.status(200).send(books);
  } catch (error) {
    console.error("get suggested books failed - " + error);
    res
      .status(500)
      .send({ error: "failed to get suggested books - server error" });
  }
});
//get suggested books paginated
bookRouter
  .route("/suggested/:skip")
  .get(async (req: Request, res: Response) => {
    try {
      const user = AuthenticationService.authenticate(
        req.headers.authorization
      );
      const books = await BookRepo.getBooksWithVotersPaginated(
        parseInt(req.params.skip)
      );
      console.log("get suggested books paginated success");
      const suggestedBooksQuantity =
        await BookRepo.getQuantityOfBooksSuggested();
      console.log("got quantity of books suggested: ", suggestedBooksQuantity);
      res.status(200).send({ books: books, count: suggestedBooksQuantity });
    } catch (error) {
      console.error("get suggested books paginated failed - " + error);
      res
        .status(500)
        .send({
          error: "failed to get suggested books paginated - server error",
        });
    }
  });
//get personal suggested books paginated
bookRouter
  .route("/:userId/suggested/:skip")
  .get(async (req: Request, res: Response) => {
    try {
      const user = AuthenticationService.authenticate(
        req.headers.authorization
      );
      const books = await BookRepo.getPersonalSuggestestionWithVotersPaginated(
        parseInt(req.params.skip),
        req.params.userId
      );
      console.log("get personal suggested books paginated success");
      const suggestedBooksQuantity =
        await BookRepo.getQuantityOfPersonalBooksSuggested(req.params.userId);
      console.log("got quantity of books suggested: ", suggestedBooksQuantity);
      res.status(200).send({ books: books, count: suggestedBooksQuantity });
    } catch (error) {
      console.error("get personal suggested books paginated failed - " + error);
      res
        .status(500)
        .send({
          error: "failed to get personal suggested books paginated - server error",
        });
    }
  });

//get read books
bookRouter.route("/read").get(async (req: Request, res: Response) => {
  try {
    const user = AuthenticationService.authenticate(req.headers.authorization);
    const books = await BookRepo.getBooksWithReaders();
    console.log("get read books success");
    res.status(200).send(books);
  } catch (error) {
    console.error("get read books failed - " + error);
    res.status(500).send({ error: "failed to get read books - server error" });
  }
});
//get read books paginated
bookRouter.route("/read/:skip").get(async (req: Request, res: Response) => {
  try {
    const user = AuthenticationService.authenticate(req.headers.authorization);
    const books = await BookRepo.getBooksWithReadersPaginated(
      parseInt(req.params.skip)
    );
    console.log("get read books paginated success");
    const readBooksQuantity = await BookRepo.getQuantityOfBooksReadByClub();
    console.log("got quantity of books read by club: ", readBooksQuantity);
    res.status(200).send({ books: books, count: readBooksQuantity });
  } catch (error) {
    console.error("get read books paginated failed - " + error);
    res
      .status(500)
      .send({ error: "failed to get read books paginated - server error" });
  }
});

//unvote on book
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

//vote on book
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

//mark book as read
bookRouter.route("/read/:id").put(async (req: Request, res: Response) => {
  try {
    const user = AuthenticationService.authenticate(req.headers.authorization);
    const bookId = req.params.id;
    const book = await BookRepo.readBook(user.id, bookId);
    console.log(
      "mark as read success\n book: " + book.title + " \n user: " + user.email
    );
    res.status(200).send(book);
  } catch (error) {
    console.error("mark as read failed - " + error);
    res.status(500).send({ error: "failed to mark as read - server error" });
  }
});

//mark book as unread
bookRouter.route("/unread/:id").put(async (req: Request, res: Response) => {
  try {
    const user = AuthenticationService.authenticate(req.headers.authorization);
    const bookId = req.params.id;
    const book = await BookRepo.unreadBook(user.id, bookId);
    console.log(
      "mark book as unread success\n book: " +
        book.title +
        " \n user: " +
        user.email
    );
    res.status(200).send(book);
  } catch (error) {
    console.error("mark book as unread failed - " + error);
    res
      .status(500)
      .send({ error: "failed to mark book as unread - server error" });
  }
});

export default bookRouter;
