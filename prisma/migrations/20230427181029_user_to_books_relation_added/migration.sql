/*
  Warnings:

  - You are about to drop the `UserBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_userId_fkey";

-- DropTable
DROP TABLE "UserBook";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_postAuthorId_fkey" FOREIGN KEY ("postAuthorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
