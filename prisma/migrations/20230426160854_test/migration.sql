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
