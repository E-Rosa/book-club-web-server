/*
  Warnings:

  - You are about to drop the `_BookToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_B_fkey";

-- DropTable
DROP TABLE "_BookToUser";

-- CreateTable
CREATE TABLE "_VotedBooks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ReadBooks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_VotedBooks_AB_unique" ON "_VotedBooks"("A", "B");

-- CreateIndex
CREATE INDEX "_VotedBooks_B_index" ON "_VotedBooks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReadBooks_AB_unique" ON "_ReadBooks"("A", "B");

-- CreateIndex
CREATE INDEX "_ReadBooks_B_index" ON "_ReadBooks"("B");

-- AddForeignKey
ALTER TABLE "_VotedBooks" ADD CONSTRAINT "_VotedBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VotedBooks" ADD CONSTRAINT "_VotedBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReadBooks" ADD CONSTRAINT "_ReadBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReadBooks" ADD CONSTRAINT "_ReadBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
