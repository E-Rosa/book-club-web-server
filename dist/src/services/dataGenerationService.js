"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookRepo_1 = __importDefault(require("../repository/bookRepo"));
const bookMetadataRepo_1 = __importDefault(require("../repository/bookMetadataRepo"));
class DataGenerationService {
    static getBookStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalBooks = yield bookRepo_1.default.getQuantityOfBooksReadByClub();
                const books = yield bookMetadataRepo_1.default.getAllBookMetadataWithTagsAndBooks();
                const bookYears = books.map((book) => book.year);
                const bookCountByCentury = this.getBooksQuantityByCentury(bookYears);
                const authorGenders = books.map((book) => book.authorGender);
                const bookCountByGender = this.getBooksCountByGender(authorGenders);
                const tagsOfEachBook = books.map((book) => book.tags.map((tag) => tag.name));
                const booksCountByTag = this.getBooksCountByTags(tagsOfEachBook);
                const booksPageQntArray = books.map((book) => book.pages);
                const booksPageCountAverage = this.getBooksPageCountAverage(booksPageQntArray);
                const booksTotalPageCount = this.getBooksTotalPageCount(booksPageQntArray);
                const bookAuthorNationalities = books.map((book) => book.authorNationality);
                const bookCountByAuthorNationality = this.getBooksAuthorNationalities(bookAuthorNationalities);
                return {
                    totalBooks: totalBooks,
                    totalPagesRead: booksTotalPageCount,
                    avaragePagesPerBook: Math.ceil(booksPageCountAverage),
                    bookCountByCentury: bookCountByCentury.sort((a, b) => b.value - a.value),
                    bookCountByGender: bookCountByGender.sort((a, b) => b.value - a.value),
                    bookCountByTag: booksCountByTag.sort((a, b) => b.value - a.value),
                    bookCountByAuthorNationality: bookCountByAuthorNationality.sort((a, b) => b.value - a.value),
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getBooksQuantityByCentury(bookYears) {
        try {
            let result = [];
            const resultContainsCentury = (name) => {
                return result.find((centuryObject) => {
                    return centuryObject.name == name;
                }) == undefined
                    ? false
                    : true;
            };
            const addOneToCentury = (name) => {
                result = result.map((centuryObject) => {
                    if (centuryObject.name == name) {
                        return Object.assign(Object.assign({}, centuryObject), { value: centuryObject.value + 1 });
                    }
                    else {
                        return centuryObject;
                    }
                });
            };
            bookYears.forEach((year, index) => {
                const name = Math.ceil(year / 100);
                if (resultContainsCentury(name)) {
                    addOneToCentury(name);
                }
                else {
                    result.push({ name: name, value: 1 });
                }
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    static getBooksCountByGender(gendersArray) {
        let count = [
            { name: "male", value: 0 },
            { name: "female", value: 0 },
        ];
        gendersArray.forEach((gender) => {
            if (gender == "masculino") {
                count = count.map((countObject) => {
                    if (countObject.name == "male") {
                        return Object.assign(Object.assign({}, countObject), { value: countObject.value + 1 });
                    }
                    return countObject;
                });
            }
            else if (gender == "feminino") {
                count = count.map((countObject) => {
                    if (countObject.name == "female") {
                        return Object.assign(Object.assign({}, countObject), { value: countObject.value + 1 });
                    }
                    return countObject;
                });
            }
            else if (gender == "desconhecido" || gender == "desconhecida") {
            }
            else {
                throw new Error("could not get book count by gender - gender is not masculino or feminino, it is: " +
                    gender);
            }
        });
        return count;
    }
    static getBooksCountByTags(tags) {
        let count = [];
        tags.forEach((tagArray) => {
            tagArray.forEach((name) => {
                const tagIsNew = count.find((tagCount) => tagCount.name == name) == undefined
                    ? true
                    : false;
                if (tagIsNew) {
                    count.push({ name: name, value: 1 });
                }
                else {
                    count = count.map((tagCount) => {
                        if (tagCount.name == name) {
                            return Object.assign(Object.assign({}, tagCount), { value: tagCount.value + 1 });
                        }
                        else {
                            return tagCount;
                        }
                    });
                }
            });
        });
        return count;
    }
    static getBooksPageCountAverage(booksPageQntArray) {
        try {
            let count = 0;
            booksPageQntArray.forEach((pageNumber) => (count += pageNumber));
            return count / booksPageQntArray.length;
        }
        catch (_a) {
            throw new Error("failed to get books page count average");
        }
    }
    static getBooksTotalPageCount(booksPageQntArray) {
        try {
            let count = 0;
            booksPageQntArray.forEach((pageNumber) => (count += pageNumber));
            return count;
        }
        catch (_a) {
            throw new Error("failed to get books page count total");
        }
    }
    static getBooksAuthorNationalities(authorNationalities) {
        try {
            let result = [];
            authorNationalities.map((name) => {
                const nationalityAlreadyExists = result.find((nationalityCount) => {
                    return nationalityCount.name == name;
                }) == undefined
                    ? false
                    : true;
                if (nationalityAlreadyExists) {
                    result = result.map((nationalityCount) => {
                        if (nationalityCount.name == name) {
                            return Object.assign(Object.assign({}, nationalityCount), { value: nationalityCount.value + 1 });
                        }
                        else {
                            return nationalityCount;
                        }
                    });
                }
                else {
                    result.push({ name: name, value: 1 });
                }
            });
            return result;
        }
        catch (error) {
            throw new Error("failed to get author nationalities, " + error);
        }
    }
}
exports.default = DataGenerationService;
//# sourceMappingURL=dataGenerationService.js.map