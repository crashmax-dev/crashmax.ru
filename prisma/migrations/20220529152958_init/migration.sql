-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "href" TEXT NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_title_key" ON "links"("title");

-- CreateIndex
CREATE UNIQUE INDEX "links_href_key" ON "links"("href");
