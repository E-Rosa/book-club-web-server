-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bookTitle" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_participantToMeeting" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_participantToMeeting_AB_unique" ON "_participantToMeeting"("A", "B");

-- CreateIndex
CREATE INDEX "_participantToMeeting_B_index" ON "_participantToMeeting"("B");

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participantToMeeting" ADD CONSTRAINT "_participantToMeeting_A_fkey" FOREIGN KEY ("A") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participantToMeeting" ADD CONSTRAINT "_participantToMeeting_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
