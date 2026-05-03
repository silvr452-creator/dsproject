/*
  Warnings:

  - You are about to drop the column `canPlayTournaments` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `playStyle` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "canPlayTournaments",
DROP COLUMN "notes",
DROP COLUMN "playStyle";
