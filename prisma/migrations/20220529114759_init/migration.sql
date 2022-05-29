-- CreateTable
CREATE TABLE "Links" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "target" TEXT NOT NULL DEFAULT E'_blank',

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_title_key" ON "Links"("title");
