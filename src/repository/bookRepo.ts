import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

class BookRepo {
  static async getBooks() {
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
      await prisma.$disconnect();
      return book;
    } catch (error) {
      await prisma.$disconnect();
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
      await prisma.$disconnect();
      return book;
    } catch (error) {
      await prisma.$disconnect();
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
      await prisma.$disconnect();
      return book;
    } catch (error) {
      await prisma.$disconnect();
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
      await prisma.$disconnect()
      return book
    } catch (error) {
      await prisma.$disconnect()
      throw new Error("unvoteOnBook failed - " + error);
    }
  }
}

export default BookRepo;
