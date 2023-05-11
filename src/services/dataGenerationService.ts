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
        bookCountByCentury: bookCountByCentury.sort((a,b)=>b.value - a.value),
        bookCountByGender: bookCountByGender.sort((a,b)=>b.value - a.value),
        bookCountByTag: booksCountByTag.sort((a,b)=>b.value - a.value),
        bookCountByAuthorNationality: bookCountByAuthorNationality.sort((a,b)=>b.value - a.value),
      };
    } catch (error) {
      throw error;
    }
  }
  static getBooksQuantityByCentury(bookYears: number[]): BookCountByCentury[] {
    try {
      let result: BookCountByCentury[] = [];
      const resultContainsCentury = (name: number) => {
        return result.find((centuryObject) => {
          return centuryObject.name == name;
        }) == undefined
          ? false
          : true;
      };
      const addOneToCentury = (name: number) => {
        result = result.map((centuryObject) => {
          if (centuryObject.name == name) {
            return {
              ...centuryObject,
              value: centuryObject.value + 1,
            };
          } else {
            return centuryObject;
          }
        });
      };
      bookYears.forEach((year, index) => {
        const name = Math.ceil(year / 100);
        if (resultContainsCentury(name)) {
          addOneToCentury(name);
        } else {
          result.push({ name: name, value: 1 });
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static getBooksCountByGender(gendersArray: string[]): BookCountByGender[] {
    let count = [
      { name: "male", value: 0 },
      { name: "female", value: 0 },
    ];
    gendersArray.forEach((gender) => {
      if (gender == "masculino") {
        count = count.map((countObject) => {
          if (countObject.name == "male") {
            return { ...countObject, value: countObject.value + 1 };
          }
          return countObject;
        });
      } else if (gender == "feminino") {
        count = count.map((countObject) => {
          if (countObject.name == "female") {
            return { ...countObject, value: countObject.value + 1 };
          }
          return countObject;
        });
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
      tagArray.forEach((name) => {
        const tagIsNew =
          count.find((tagCount) => tagCount.name == name) == undefined
            ? true
            : false;
        if (tagIsNew) {
          count.push({ name: name, value: 1 });
        } else {
          count = count.map((tagCount) => {
            if (tagCount.name == name) {
              return { ...tagCount, value: tagCount.value + 1 };
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
      authorNationalities.map((name) => {
        const nationalityAlreadyExists =
          result.find((nationalityCount) => {
            return nationalityCount.name == name;
          }) == undefined
            ? false
            : true;
        if (nationalityAlreadyExists) {
          result = result.map((nationalityCount) => {
            if (nationalityCount.name == name) {
              return { ...nationalityCount, value: nationalityCount.value + 1 };
            } else {
              return nationalityCount;
            }
          });
        } else {
          result.push({ name: name, value: 1 });
        }
      });
      return result;
    } catch (error) {
      throw new Error("failed to get author nationalities, " + error);
    }
  }
}

export default DataGenerationService;
