-- DropForeignKey
ALTER TABLE "BookMetadata" DROP CONSTRAINT "BookMetadata_bookId_fkey";

-- AddForeignKey
ALTER TABLE "BookMetadata" ADD CONSTRAINT "BookMetadata_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
