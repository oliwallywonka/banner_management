-- CreateTable
CREATE TABLE "contents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "screens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "screen_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "content_screen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contentId" INTEGER NOT NULL,
    "screenId" INTEGER NOT NULL,
    "startAt" INTEGER NOT NULL,
    "endAt" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    CONSTRAINT "content_screen_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "contents" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "content_screen_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "screens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
