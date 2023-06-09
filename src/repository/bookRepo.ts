import { PrismaClient } from "@prisma/client";
import { Book } from "@prisma/client";
const prisma = new PrismaClient();

class BookRepo {
  static async getBooksWithVoters() {
    try {
      const book = await prisma.book.findMany({
        where: { isRead: false },
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
  };
  static async getBooksWithVotersPaginated(skip: number) {
    try {
      const book = await prisma.book.findMany({
        skip: skip,
        take: 10,
        where: { isRead: false },
        include: {
          voters: {
            select: {
              name: true,
              email: true,
              id: true,
            },
          },
        },
        orderBy:{
          voters:{
            _count: 'desc'
          }
        }
      });

      return book;
    } catch (error) {
      throw error;
    }
  }
  static async getPersonalSuggestestionWithVotersPaginated(skip: number, userId: string) {
    try {
      const book = await prisma.book.findMany({
        skip: skip,
        take: 10,
        where: { isRead: false, postAuthorId: userId },
        include: {
          voters: {
            select: {
              name: true,
              email: true,
              id: true,
            },
          },
        },
        orderBy:{
          voters:{
            _count: 'desc'
          }
        }
      });

      return book;
    } catch (error) {
      throw error;
    }
  }
  static async getQuantityOfBooksSuggested() {
    try {
      const quantity = await prisma.book.count({
        where: { isRead: false },
      });

      return quantity;
    } catch (error) {
      throw error;
    }
  }
  static async getQuantityOfPersonalBooksSuggested(userId: string) {
    try {
      const quantity = await prisma.book.count({
        where: { isRead: false, postAuthorId: userId },
      });

      return quantity;
    } catch (error) {
      throw error;
    }
  }
  static async getBooksWithReaders() {
    try {
      const book = await prisma.book.findMany({
        where: {
          isRead: true,
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
        orderBy:{
          readers:{
            _count: 'desc'
          }
        }
      });

      return book;
    } catch (error) {
      throw error;
    }
  }
  static async getBooksWithReadersAndMetadataPaginated(skip: number) {
    try {
      const book = await prisma.book.findMany({
        skip: skip,
        take: 10,
        where: { isRead: true },
        include: {
          readers: {
            select: {
              name: true,
              email: true,
              id: true,
            },
          },
        BookMetadata: {
            include:{
              tags: {
                select:{
                  name:true
                }
              }
            }
          },

        },
        orderBy:{
          readers:{
            _count: 'desc'
          }
        }
      });

      return book;
    } catch (error) {
      throw error;
    }
  }
  static async getQuantityOfBooksReadByClub() {
    try {
      const quantity = await prisma.book.count({
        where: { isRead: true },
      });

      return quantity;
    } catch (error) {
      throw error;
    }
  }
  static async postBook(postAuthorId: string, title: string, author: string, description: string) {
    try {
      const book = await prisma.book.create({
        data: {
          postAuthorId: postAuthorId,
          title: title,
          author: author,
          description: description,
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
  static async updateBook(bookId: string, author: string, title: string, description: string) {
    try {
      const updatedBook = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          id: bookId,
          author: author,
          title: title,
          description:description
        },
      });

      return updatedBook;
    } catch (error) {
      throw new Error("updateBook failed - " + error);
    }
  }
  static async markBookAsReadByClub(bookId: string) {
    try {
      const bookMarkAsReadByClub = await prisma.book.update({
        where: { id: bookId },
        data: {
          isRead: true,
        },
      });
      return bookMarkAsReadByClub;
    } catch (error) {
      throw new Error("markBookAsReadByClub failed - " + error);
    }
  }
  static async unmarkBookAsReadByClub(bookId: string) {
    try {
      const bookMarkAsReadByClub = await prisma.book.update({
        where: { id: bookId },
        data: {
          isRead: false,
        },
      });
      return bookMarkAsReadByClub;
    } catch (error) {
      throw new Error("markBookAsReadByClub failed - " + error);
    }
  }
  static async deleteBook(bookId: string) {
    try {
      const deletedBook = await prisma.book.delete({
        where: { id: bookId },
      });
      return deletedBook;
    } catch (error) {
      throw new Error("deleteBook failed - " + error);
    }
  }
}

export default BookRepo;
