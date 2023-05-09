-- CreateTable
CREATE TABLE "BookMetadata" (
    "bookId" TEXT NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "authorNationality" TEXT NOT NULL,
    "authorGender" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,

    CONSTRAINT "BookMetadata_pkey" PRIMARY KEY ("bookId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BooksToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BooksToTags_AB_unique" ON "_BooksToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_BooksToTags_B_index" ON "_BooksToTags"("B");

-- AddForeignKey
ALTER TABLE "BookMetadata" ADD CONSTRAINT "BookMetadata_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BooksToTags" ADD CONSTRAINT "_BooksToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "BookMetadata"("bookId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BooksToTags" ADD CONSTRAINT "_BooksToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
