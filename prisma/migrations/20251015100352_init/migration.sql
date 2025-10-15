-- CreateTable
CREATE TABLE "Chapter" (
    "id" SERIAL NOT NULL,
    "aired" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);
