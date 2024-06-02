-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_userId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicles` DROP FOREIGN KEY `vehicles_reservationId_fkey`;

-- AlterTable
ALTER TABLE `vehicles` ADD COLUMN `visibible` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `reservations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
