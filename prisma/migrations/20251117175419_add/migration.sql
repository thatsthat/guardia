-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "session_uid" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SessionToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SessionToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SessionToTag_B_index" ON "_SessionToTag"("B");

-- AddForeignKey
ALTER TABLE "_SessionToTag" ADD CONSTRAINT "_SessionToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionToTag" ADD CONSTRAINT "_SessionToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
