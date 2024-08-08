/*
  Warnings:

  - Added the required column `reservations` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reservations" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Reserve" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reserve_pkey" PRIMARY KEY ("id")
);
