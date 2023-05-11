import { PrismaClient, BookMetadata, Tag } from "@prisma/client";
import { UserBookMetadata } from "../interfaces/interfaces";
const prisma = new PrismaClient();

class BookMetadataRepo {
  static async createBookMetadataAndConnectTags(data: {
    metadata: {
      bookName: string;
      year: number;
      authorNationality: string;
      authorGender: string;
      pages: number;
    };
    tags: string[];
  }) {
    try {
      const bookMetadata = await prisma.bookMetadata.create({
        data: {
          authorGender: data.metadata.authorGender,
          authorNationality: data.metadata.authorNationality,
          pages: data.metadata.pages,
          year: data.metadata.year,
          book: {
            connect: {
              title: data.metadata.bookName,
            },
          },
        },
      });
      for (let i = 0; i < data.tags.length; i++) {
        await prisma.bookMetadata.update({
          where: { bookId: bookMetadata.bookId },
          data: {
            tags: {
              connect: {
                name: data.tags[i],
              },
            },
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }
  static async getBookIdByName(bookName: string) {
    try {
      const bookId = await prisma.book.findFirst({
        where: { title: bookName },
        select: { id: true },
      });
      if (bookId == null) {
        throw new Error("could not get book ID by name");
      }
      return bookId.id;
    } catch (error) {
      throw error;
    }
  }
  static async getAllBookMetadataWithTagsAndBooks() {
    try {
      return await prisma.bookMetadata.findMany({
        include: {
          book: true,
          tags: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  static async getStaticMetadata() {
    try {
      const metadata = await prisma.staticMetadata.findFirst();
      if (metadata == null) {
        throw new Error("no static metadata found");
      }
      return metadata.data;
    } catch (error) {
      throw error;
    }
  }
  static async updateStaticMetadata(metadataStringfied: string) {
    try {
      return await prisma.staticMetadata.update({
        where: { id: 1 },
        data: {
          data: metadataStringfied,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  static async createBookMetadataFromUserData(
    metadata: UserBookMetadata,
    bookId: string
  ) {
    try {
      return await prisma.bookMetadata.create({
        data: {
          authorGender: metadata.authorGender,
          authorNationality: metadata.authorNationality,
          pages: metadata.pages,
          year: metadata.year,
          book: {
            connect: {
              id: bookId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default BookMetadataRepo;
