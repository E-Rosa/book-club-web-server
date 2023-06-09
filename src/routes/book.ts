import { AuthenticationService } from "../services/authenticationService";
import { Request, Response, Router } from "express";
import BookRepo from "../repository/bookRepo";
import DataGenerationService from "../services/dataGenerationService";
import BookMetadataRepo from "../repository/bookMetadataRepo";
import TagRepo from "../repository/tagRepo";

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
      const book = await BookRepo.postBook(
        postAuthorId,
        title,
        author,
        description
      );
      console.log("post book success - " + book.title);
      console.log("book is: ", book);
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
      console.log("received id and title: ", id, title);
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
      res.status(500).send({
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
      res.status(500).send({
        error:
          "failed to get personal suggested books paginated - server error",
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
    const books = await BookRepo.getBooksWithReadersAndMetadataPaginated(
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
//get book statistics
bookRouter
  .route("/statistics")
  .get(async (req: Request, res: Response) => {
    try {
      console.log("trying to get statistics");
      const user = AuthenticationService.authenticate(
        req.headers.authorization
      );
      console.log("user authenticated");
      const statistics = await BookMetadataRepo.getStaticMetadata();
      console.log("get statistics success");
      res.status(200).send(statistics);
    } catch (error) {
      console.error("get statistics failed - " + error);
      res
        .status(500)
        .send({ error: "failed to get statistics - server error" });
    }
  })
  .put(async (req: Request, res: Response) => {
    //update static book metadata table
    try {
      console.log("trying to get statistics");
      AuthenticationService.authenticateAdmin(req.headers.authorization);
      console.log("admin authenticated");
      const updatedStatistics = JSON.stringify(
        await DataGenerationService.getBookStatistics()
      );
      console.log("get updated statistics success");
      await BookMetadataRepo.updateStaticMetadata(updatedStatistics);
      console.log("update static metadata success");
      res.sendStatus(200);
    } catch (error) {
      console.error("update static book metadata failed - " + error);
      res.status(500).send({
        error: "failed to update static book metadata - server error",
      });
    }
  });

//post book metadata
bookRouter
  .route("/metadata/:bookId")
  .put(async (req: Request, res: Response) => {
    try {
      console.log("started to update metadata");
      const user = AuthenticationService.authenticate(
        req.headers.authorization
      );
      console.log("user authenticated");
      const { metadata, tags } = req.body;
      const { year, pages, authorNationality, authorGender } = metadata;
      const bookMetadata =
        await BookMetadataRepo.createBookMetadataFromUserData(
          {
            year: parseInt(year),
            pages: parseInt(pages),
            authorGender: authorGender,
            authorNationality: authorNationality,
            tags: tags,
          },
          req.params.bookId
        );
      console.log("post book metadata success");
      await BookMetadataRepo.connectTags(bookMetadata.bookId, tags);
      console.log("tags connected");
      res.status(200).send(bookMetadata);
    } catch (error) {
      console.error("post book metadata failed - " + error);
      res
        .status(500)
        .send({ error: "failed to post book metadata - server error" });
    }
  });

//post tags
bookRouter.route("/metadata/tags").post(async (req: Request, res: Response) => {
  try {
    console.log("/api/books/metadata/tags");
    console.log("started to post tags");
    const user = AuthenticationService.authenticate(req.headers.authorization);
    console.log("user authenticated");
    const { tags } = req.body;
    tags.forEach(async (tag: string) => {
      await TagRepo.createTag(tag);
    });
    console.log("tags created - success");
    res.sendStatus(200);
  } catch (error) {
    console.error("post tags failed - " + error);
    res.status(500).send({ error: "failed to post tags - server error" });
  }
});

//cron job: get updated metadata and update static metadata
bookRouter.route("/cron").put(async (req: Request, res: Response) => {
  try {
    const newMetadata = JSON.stringify(
      await DataGenerationService.getBookStatistics()
    );
    const newStaticMetadata = await BookMetadataRepo.updateStaticMetadata(
      newMetadata
    );
    res.status(200).send(newStaticMetadata.data);
  } catch (error) {
    console.error("get and update metadata failed - " + error);
    res
      .status(500)
      .send({ error: "failed to get and update metadata - server error" });
  }
});

export default bookRouter;
