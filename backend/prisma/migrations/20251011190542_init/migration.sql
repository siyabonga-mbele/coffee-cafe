-- CreateTable
CREATE TABLE "Brew" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "beans" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "coffeeGrams" INTEGER NOT NULL,
    "waterGrams" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
