import { PrismaClient } from "@prisma/client";
import { Book } from "@prisma/client";
const prisma = new PrismaClient();

class BookRepo {
  static async getBooksWithVoters() {
    try {
      const book = await prisma.book.findMany({
        include: {
          voters: {
            select: {
              name: true,
              email: true,
              id: true,
            },
          },
        },
      });

      return book;
    } catch (error) {
      throw error;
    }
  }
  static async getBooksWithReaders() {
    try {
      const book = await prisma.book.findMany({
        where: {
          isRead: true
        },
        include: {
          readers: {
            select: {
              name: true,
              email: true,
              id: true,
            },
          },
        },
      });

      return book;
    } catch (error) {
      throw error;
    }
  }
  static async postBook(postAuthorId: string, title: string, author: string) {
    try {
      const book = await prisma.book.create({
        data: {
          postAuthorId: postAuthorId,
          title: title,
          author: author,
          voters: {
            connect: { id: postAuthorId },
          },
        },
      });

      return book;
    } catch (error) {
      throw new Error("postBook failed - " + error);
    }
  }
  static async voteOnBook(userId: string, bookId: string) {
    try {
      const book = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          voters: {
            connect: { id: userId },
          },
        },
      });

      return book;
    } catch (error) {
      throw new Error("voteOnBook failed - " + error);
    }
  }
  static async unvoteOnBook(userId: string, bookId: string) {
    try {
      const book = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          voters: {
            disconnect: { id: userId },
          },
        },
      });

      return book;
    } catch (error) {
      throw new Error("unvoteOnBook failed - " + error);
    }
  }
  static async readBook(userId: string, bookId: string) {
    try {
      const book = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          readers: {
            connect: { id: userId },
          },
        },
      });

      return book;
    } catch (error) {
      throw new Error("voteOnBook failed - " + error);
    }
  }
  static async unreadBook(userId: string, bookId: string) {
    try {
      const book = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          readers: {
            disconnect: { id: userId },
          },
        },
      });

      return book;
    } catch (error) {
      throw new Error("unvoteOnBook failed - " + error);
    }
  }
  static async updateBook(bookId: string, author: string, title: string){
    try {
      const updatedBook = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          author: author,
          title: title
        },
      });

      return updatedBook;
    } catch (error) {
      throw new Error("updateBook failed - " + error);
    }
  }
}

export default BookRepo;
