-- CreateTable
CREATE TABLE "_ChapterToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ChapterToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ChapterToTag_B_index" ON "_ChapterToTag"("B");

-- AddForeignKey
ALTER TABLE "_ChapterToTag" ADD CONSTRAINT "_ChapterToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChapterToTag" ADD CONSTRAINT "_ChapterToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
