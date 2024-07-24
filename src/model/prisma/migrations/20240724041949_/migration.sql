/*
  Warnings:

  - Added the required column `description` to the `Restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserType" ADD VALUE 'admin';

-- AlterTable
ALTER TABLE "Restaurants" ADD COLUMN     "description" TEXT NOT NULL;
