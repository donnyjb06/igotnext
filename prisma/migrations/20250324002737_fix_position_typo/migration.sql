/*
  Warnings:

  - You are about to drop the column `positition` on the `User` table. All the data in the column will be lost.
  - Added the required column `position` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "positition",
ADD COLUMN     "position" "Position" NOT NULL;
