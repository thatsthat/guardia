/*
  Warnings:

  - Added the required column `transcription` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "transcription" TEXT NOT NULL;
