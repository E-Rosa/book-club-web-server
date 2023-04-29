import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

class BookRepo {
  static async getBooks() {
    try {
      return await prisma.book.findMany({
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
    } catch (error) {
      throw new Error("getBooks failed");
    }
  }
  static async postBook(
    postAuthorId: string,
    title: string,
    author: string
  ) {
    try {
      return await prisma.book.create({
        data: {
          postAuthorId: postAuthorId,
          title: title,
          author: author,
          voters: {
            connect: { id: postAuthorId },
          },
        },
      });
    } catch (error) {
      throw new Error("postBook failed - " + error);
    }
  }
  static async voteOnBook(userId: string, bookId: string) {
    try {
      return await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          voters: {
            connect: { id: userId },
          },
        },
      });
    } catch (error) {
      throw new Error("voteOnBook failed - " + error);
    }
  }
  static async unvoteOnBook(userId: string, bookId: string) {
    try {
      return await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          voters: {
            disconnect: { id: userId },
          },
        },
      });
    } catch (error) {
      throw new Error("unvoteOnBook failed - " + error);
    }
  }
}

export default BookRepo;
