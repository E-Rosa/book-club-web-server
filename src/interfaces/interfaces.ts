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
  bookCountByGender: BookCountByGender[];
  bookCountByTag: BookCountByTag[];
  bookCountByAuthorNationality: BookCountByAuthorNationality[];
}

interface BookCountByCentury {
  name: number;
  value: number;
}
interface BookCountByGender {
  name: string;
  value: number;
}
interface BookCountByTag {
  name: string;
  value: number;
}
interface BookCountByAuthorNationality {
  name: string;
  value: number;
}
interface UserBookMetadata{
  year: number;
  pages: number;
  authorNationality: string;
  authorGender: string;
  tags: UserTag[]
}
interface UserTag{
  tagName: string;
}

export {
  UserPayload,
  BookStatistics,
  BookCountByAuthorNationality,
  BookCountByCentury,
  BookCountByGender,
  BookCountByTag,
  UserBookMetadata,
  UserTag
};
