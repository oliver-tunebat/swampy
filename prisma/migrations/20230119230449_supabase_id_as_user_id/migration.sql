/*
  Warnings:

  - You are about to drop the column `supabaseId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "supabaseId",
ALTER COLUMN "id" DROP DEFAULT;
