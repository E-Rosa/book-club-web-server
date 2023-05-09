import TagRepo from "../repository/tagRepo";
import BookRepo from "../repository/bookRepo";
import BookMetadataRepo from "../repository/bookMetadataRepo";
import {
  BookStatistics,
  BookCountByCentury,
  BookCountByGender,
  BookCountByTag,
  BookCountByAuthorNationality,
} from "../interfaces/interfaces";

class DataGenerationService {
  static async getBookStatistics(): Promise<BookStatistics> {
    try {
      const totalBooks = await BookRepo.getQuantityOfBooksReadByClub();
      const books = await BookMetadataRepo.getAllBookMetadataWithTagsAndBooks();
      const bookYears = books.map((book) => book.year);
      const bookCountByCentury = this.getBooksQuantityByCentury(bookYears);
      const authorGenders = books.map((book) => book.authorGender);
      const bookCountByGender = this.getBooksCountByGender(authorGenders);
      const tagsOfEachBook = books.map((book) =>
        book.tags.map((tag) => tag.name)
      );
      const booksCountByTag = this.getBooksCountByTags(tagsOfEachBook);
      const booksPageQntArray: number[] = books.map((book) => book.pages);
      const booksPageCountAverage =
        this.getBooksPageCountAverage(booksPageQntArray);
      const booksTotalPageCount =
        this.getBooksTotalPageCount(booksPageQntArray);
      const bookAuthorNationalities = books.map(
        (book) => book.authorNationality
      );
      const bookCountByAuthorNationality = this.getBooksAuthorNationalities(
        bookAuthorNationalities
      );
      return {
        totalBooks: totalBooks,
        totalPagesRead: booksTotalPageCount,
        avaragePagesPerBook: Math.ceil(booksPageCountAverage),
        bookCountByCentury: bookCountByCentury,
        bookCountByGender: bookCountByGender,
        bookCountByTag: booksCountByTag,
        bookCountByAuthorNationality: bookCountByAuthorNationality,
      };
    } catch (error) {
      throw error;
    }
  }
  static getBooksQuantityByCentury(bookYears: number[]): BookCountByCentury[] {
    try {
      let result: BookCountByCentury[] = [];
      const resultContainsCentury = (century: number) => {
        return result.find((centuryObject) => {
          return centuryObject.century == century;
        }) == undefined
          ? false
          : true;
      };
      const addOneToCentury = (century: number) => {
        result = result.map((centuryObject) => {
          if (centuryObject.century == century) {
            return {
              ...centuryObject,
              count: centuryObject.count + 1,
            };
          } else {
            return centuryObject;
          }
        });
      };
      bookYears.forEach((year, index) => {
        const century = Math.ceil(year / 100);
        if (resultContainsCentury(century)) {
          addOneToCentury(century);
        } else {
          result.push({ century: century, count: 1 });
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static getBooksCountByGender(gendersArray: string[]): BookCountByGender {
    let count = { male: 0, female: 0 };
    gendersArray.forEach((gender) => {
      if (gender == "masculino") {
        count = { ...count, male: count.male + 1 };
      } else if (gender == "feminino") {
        count = { ...count, female: count.female + 1 };
      } else if (gender == "desconhecido" || gender == "desconhecida") {
      } else {
        throw new Error(
          "could not get book count by gender - gender is not masculino or feminino, it is: " +
            gender
        );
      }
    });
    return count;
  }
  static getBooksCountByTags(tags: string[][]): BookCountByTag[] {
    let count: BookCountByTag[] = [];
    tags.forEach((tagArray) => {
      tagArray.forEach((tagName) => {
        const tagIsNew =
          count.find((tagCount) => tagCount.tagName == tagName) == undefined
            ? true
            : false;
        if (tagIsNew) {
          count.push({ tagName: tagName, count: 1 });
        } else {
          count = count.map((tagCount) => {
            if (tagCount.tagName == tagName) {
              return { ...tagCount, count: tagCount.count + 1 };
            } else {
              return tagCount;
            }
          });
        }
      });
    });
    return count;
  }
  static getBooksPageCountAverage(booksPageQntArray: number[]) {
    try {
      let count = 0;
      booksPageQntArray.forEach((pageNumber) => (count += pageNumber));
      return count / booksPageQntArray.length;
    } catch {
      throw new Error("failed to get books page count average");
    }
  }
  static getBooksTotalPageCount(booksPageQntArray: number[]) {
    try {
      let count = 0;
      booksPageQntArray.forEach((pageNumber) => (count += pageNumber));
      return count;
    } catch {
      throw new Error("failed to get books page count total");
    }
  }
  static getBooksAuthorNationalities(
    authorNationalities: string[]
  ): BookCountByAuthorNationality[] {
    try {
      let result: BookCountByAuthorNationality[] = [];
      authorNationalities.map((nationality) => {
        const nationalityAlreadyExists =
          result.find((nationalityCount) => {
            return nationalityCount.nationality == nationality;
          }) == undefined
            ? false
            : true;
        if (nationalityAlreadyExists) {
          result = result.map((nationalityCount) => {
            if (nationalityCount.nationality == nationality) {
              return { ...nationalityCount, count: nationalityCount.count + 1 };
            } else {
              return nationalityCount;
            }
          });
        } else {
          result.push({ nationality: nationality, count: 1 });
        }
      });
      return result;
    } catch (error) {
      throw new Error("failed to get author nationalities, " + error);
    }
  }
}

export default DataGenerationService;
