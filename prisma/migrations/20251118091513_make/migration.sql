/*
  Warnings:

  - A unique constraint covering the columns `[session_uid]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Session_session_uid_key" ON "Session"("session_uid");
