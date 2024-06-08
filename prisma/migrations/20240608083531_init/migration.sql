/*
  Warnings:

  - You are about to drop the `sum` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "requestType" AS ENUM ('Sum', 'Multiply');

-- DropTable
DROP TABLE "sum";

-- CreateTable
CREATE TABLE "calculation" (
    "id" SERIAL NOT NULL,
    "a" INTEGER NOT NULL,
    "b" INTEGER NOT NULL,
    "result" INTEGER NOT NULL,
    "type" "requestType" NOT NULL,

    CONSTRAINT "calculation_pkey" PRIMARY KEY ("id")
);
