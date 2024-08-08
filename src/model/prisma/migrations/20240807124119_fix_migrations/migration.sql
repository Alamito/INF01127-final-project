-- AlterTable
ALTER TABLE "Reserve" ADD COLUMN     "id_space" INTEGER,
ADD COLUMN     "id_user" INTEGER,
ALTER COLUMN "date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Restaurants" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "total_tables" DROP NOT NULL,
ALTER COLUMN "source_image" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Space" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "source_image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "reservations" DROP NOT NULL;
