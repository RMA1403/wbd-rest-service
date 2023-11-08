-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TECHNOLOGY', 'COMEDY', 'HORROR');

-- CreateTable
CREATE TABLE "dummy_table" (
    "description" TEXT NOT NULL
);
<<<<<<< HEAD

-- CreateTable
CREATE TABLE "premium_users" (
    "id_user" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "url_profpic" VARCHAR(100) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "premium_users_pkey" PRIMARY KEY ("id_user")
);

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
    "urlThumbnail" VARCHAR(100) NOT NULL,
    "urlAudio" VARCHAR(100) NOT NULL,
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
CREATE TABLE "premium_playlist_x_podcast" (
    "id_playlist" INTEGER NOT NULL,
    "id_podcast" INTEGER NOT NULL,

    CONSTRAINT "premium_playlist_x_podcast_pkey" PRIMARY KEY ("id_playlist","id_podcast")
);

-- CreateTable
CREATE TABLE "queue" (
    "id_queue" INTEGER NOT NULL,
    "id_episode" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "queue_pkey" PRIMARY KEY ("id_queue","position")
);

-- CreateIndex
CREATE UNIQUE INDEX "dummy_table_description_key" ON "dummy_table"("description");

-- CreateIndex
CREATE UNIQUE INDEX "premium_users_username_key" ON "premium_users"("username");

-- AddForeignKey
ALTER TABLE "premium_podcasts" ADD CONSTRAINT "premium_podcasts_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "premium_users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premium_episodes" ADD CONSTRAINT "premium_episodes_id_podcast_fkey" FOREIGN KEY ("id_podcast") REFERENCES "premium_podcasts"("id_podcast") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premium_playlist" ADD CONSTRAINT "premium_playlist_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "premium_users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premium_playlist_x_podcast" ADD CONSTRAINT "premium_playlist_x_podcast_id_playlist_fkey" FOREIGN KEY ("id_playlist") REFERENCES "premium_playlist"("id_playlist") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premium_playlist_x_podcast" ADD CONSTRAINT "premium_playlist_x_podcast_id_podcast_fkey" FOREIGN KEY ("id_podcast") REFERENCES "premium_podcasts"("id_podcast") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue" ADD CONSTRAINT "queue_id_episode_fkey" FOREIGN KEY ("id_episode") REFERENCES "premium_episodes"("id_episode") ON DELETE CASCADE ON UPDATE CASCADE;

=======
CREATE TABLE IF NOT EXISTS premium_episodes (
  id_episode SERIAL PRIMARY KEY,
  title VARCHAR(50),
  description VARCHAR(1000),
  url_thumbnail VARCHAR(100),
  url_audio VARCHAR(100),
  id_podcast INT NOT NULL,
  FOREIGN KEY (id_podcast) REFERENCES premium_podcasts(id_podcast) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS queues (
  id_queue INT NOT NULL,
  id_episode INT NOT NULL,
  FOREIGN KEY (id_episode) REFERENCES premium_episodes(id_episode) ON DELETE CASCADE
);
INSERT INTO dummy_table ("description")
VALUES ('teks ini berasal dari database :o');
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 1',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'technology'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 2',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'technology'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 3',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'technology'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 4',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'technology'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 5',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'technology'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 6',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'horror'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 7',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'horror'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 8',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'horror'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 9',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'horror'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 10',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'horror'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 11',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'comedy'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 12',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'comedy'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 13',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'comedy'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 14',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'comedy'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 15',
    'public/escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'comedy'
  );
>>>>>>> 5466e5b6033af75fcbdac7dcd4578e9d9afbad76
