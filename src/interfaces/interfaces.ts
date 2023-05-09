interface UserPayload {
  email: string;
  id: string;
  isAdmin: boolean;
}
interface BookStatistics {
  totalBooks: number;
  totalPagesRead: number;
  avaragePagesPerBook: number;
  bookCountByCentury: BookCountByCentury[];
  bookCountByGender: BookCountByGender;
  bookCountByTag: BookCountByTag[];
  bookCountByAuthorNationality: BookCountByAuthorNationality[];
}

interface BookCountByCentury {
  century: number;
  count: number;
}
interface BookCountByGender {
  male: number;
  female: number;
}
interface BookCountByTag {
  tagName: string;
  count: number;
}
interface BookCountByAuthorNationality {
  nationality: string;
  count: number;
}

export {
  UserPayload,
  BookStatistics,
  BookCountByAuthorNationality,
  BookCountByCentury,
  BookCountByGender,
  BookCountByTag,
};
