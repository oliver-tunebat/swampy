-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "isEmailNotificationsEnabled" DROP NOT NULL,
ALTER COLUMN "isEmailNotificationsEnabled" DROP DEFAULT;
