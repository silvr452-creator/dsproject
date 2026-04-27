-- CreateEnum
CREATE TYPE "PlayerStatus" AS ENUM ('ACTIVE', 'LOW_ACTIVITY', 'UNDER_REVIEW', 'AWAY', 'CANDIDATE_FOR_REMOVAL');

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "discordUserId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" INTEGER NOT NULL DEFAULT 0,
    "totalExp" INTEGER NOT NULL DEFAULT 0,
    "rating7d" INTEGER NOT NULL DEFAULT 0,
    "rating30d" INTEGER NOT NULL DEFAULT 0,
    "ratingAll" INTEGER NOT NULL DEFAULT 0,
    "status" "PlayerStatus" NOT NULL DEFAULT 'ACTIVE',
    "lastActivityAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "gearText" TEXT,
    "gearImageUrl" TEXT,
    "canPlayAt" TEXT,
    "cannotPlayAt" TEXT,
    "timezone" TEXT,
    "playStyle" TEXT,
    "canPlayTournaments" BOOLEAN,
    "hasMicrophone" BOOLEAN,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerChannels" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "categoryChannelId" TEXT,
    "menuChannelId" TEXT,
    "questsChannelId" TEXT,
    "rulesChannelId" TEXT,
    "warningsChannelId" TEXT,
    "awayChannelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerChannels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_discordUserId_key" ON "Player"("discordUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_playerId_key" ON "Profile"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerChannels_playerId_key" ON "PlayerChannels"("playerId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerChannels" ADD CONSTRAINT "PlayerChannels_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
