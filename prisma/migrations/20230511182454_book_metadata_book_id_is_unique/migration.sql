/*
  Warnings:

  - A unique constraint covering the columns `[bookId]` on the table `BookMetadata` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BookMetadata_bookId_key" ON "BookMetadata"("bookId");
