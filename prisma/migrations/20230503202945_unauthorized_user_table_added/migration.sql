-- CreateTable
CREATE TABLE "UnauthorizedUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "UnauthorizedUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnauthorizedUser_email_key" ON "UnauthorizedUser"("email");
