-- CreateTable
CREATE TABLE "OutbreakHistory" (
    "id" TEXT NOT NULL,
    "outbreakId" TEXT NOT NULL,
    "previousCases" INTEGER NOT NULL,
    "newCases" INTEGER NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OutbreakHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalMetrics" (
    "id" TEXT NOT NULL,
    "totalCases" INTEGER NOT NULL,
    "totalDeaths" INTEGER NOT NULL,
    "affectedCountries" INTEGER NOT NULL,
    "sourceId" TEXT NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GlobalMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelineEvent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "sourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TimelineEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OutbreakHistory" ADD CONSTRAINT "OutbreakHistory_outbreakId_fkey" FOREIGN KEY ("outbreakId") REFERENCES "Outbreak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalMetrics" ADD CONSTRAINT "GlobalMetrics_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimelineEvent" ADD CONSTRAINT "TimelineEvent_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
