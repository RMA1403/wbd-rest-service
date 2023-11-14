-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TECHNOLOGY', 'COMEDY', 'HORROR');

-- CreateTable
CREATE TABLE "premium_podcasts" (
    "id_podcast" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "url_thumbnail" VARCHAR(100) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "category" "Category" NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "premium_podcasts_pkey" PRIMARY KEY ("id_podcast")
);

-- CreateTable
CREATE TABLE "premium_episodes" (
    "id_episode" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "url_thumbnail" VARCHAR(100) NOT NULL,
    "url_audio" VARCHAR(100) NOT NULL,
    "id_podcast" INTEGER NOT NULL,

    CONSTRAINT "premium_episodes_pkey" PRIMARY KEY ("id_episode")
);

-- CreateTable
CREATE TABLE "premium_playlist" (
    "id_playlist" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "premium_playlist_pkey" PRIMARY KEY ("id_playlist")
);

-- CreateTable
CREATE TABLE "queues" (
    "id_queue" INTEGER NOT NULL,
    "id_episode" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "queues_pkey" PRIMARY KEY ("id_queue","position")
);

-- CreateTable
CREATE TABLE "premium_playlist_x_podcast" (
    "id_playlist" INTEGER NOT NULL,
    "id_podcast" INTEGER NOT NULL,

    CONSTRAINT "premium_playlist_x_podcast_pkey" PRIMARY KEY ("id_playlist","id_podcast")
);

-- AddForeignKey
ALTER TABLE "premium_episodes" ADD CONSTRAINT "premium_episodes_id_podcast_fkey" FOREIGN KEY ("id_podcast") REFERENCES "premium_podcasts"("id_podcast") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queues" ADD CONSTRAINT "queues_id_episode_fkey" FOREIGN KEY ("id_episode") REFERENCES "premium_episodes"("id_episode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premium_playlist_x_podcast" ADD CONSTRAINT "premium_playlist_x_podcast_id_playlist_fkey" FOREIGN KEY ("id_playlist") REFERENCES "premium_playlist"("id_playlist") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premium_playlist_x_podcast" ADD CONSTRAINT "premium_playlist_x_podcast_id_podcast_fkey" FOREIGN KEY ("id_podcast") REFERENCES "premium_podcasts"("id_podcast") ON DELETE CASCADE ON UPDATE CASCADE;

