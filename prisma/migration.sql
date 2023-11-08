-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TECHNOLOGY', 'COMEDY', 'HORROR');

-- CreateTable
CREATE TABLE "premium_users" (
    "idUser" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "url_profpic" VARCHAR(100) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "premium_users_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "premium_podcasts" (
    "idPodcast" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "urlThumbnail" VARCHAR(100) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "category" "Category" NOT NULL,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "premium_podcasts_pkey" PRIMARY KEY ("idPodcast")
);

-- CreateTable
CREATE TABLE "premium_episodes" (
    "idEpisode" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "urlThumbnail" VARCHAR(100) NOT NULL,
    "urlAudio" VARCHAR(100) NOT NULL,
    "idPodcast" INTEGER NOT NULL,

    CONSTRAINT "premium_episodes_pkey" PRIMARY KEY ("idEpisode")
);

-- CreateTable
CREATE TABLE "premium_playlist" (
    "idPlaylist" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "premium_playlist_pkey" PRIMARY KEY ("idPlaylist")
);

-- CreateIndex
CREATE UNIQUE INDEX "premium_users_username_key" ON "premium_users"("username");

-- AddForeignKey
ALTER TABLE "premium_podcasts" ADD CONSTRAINT "premium_podcasts_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "premium_users"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premium_episodes" ADD CONSTRAINT "premium_episodes_idPodcast_fkey" FOREIGN KEY ("idPodcast") REFERENCES "premium_podcasts"("idPodcast") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premium_playlist" ADD CONSTRAINT "premium_playlist_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "premium_users"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

