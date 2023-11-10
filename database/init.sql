-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TECHNOLOGY', 'COMEDY', 'HORROR');

-- CreateTable
CREATE TABLE "dummy_table" (
    "description" TEXT NOT NULL
);

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
CREATE TABLE IF NOT EXISTS queues (
  id_queue INT NOT NULL,
  id_episode INT NOT NULL,
  position INT NOT NULL,
  PRIMARY KEY (id_queue, position),
  FOREIGN KEY (id_episode) REFERENCES premium_episodes(id_episode) ON DELETE CASCADE
);
INSERT INTO dummy_table ("description")
VALUES ('teks ini berasal dari database :o');
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 1',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'technology'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 2',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'technology'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 3',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'technology'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 4',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'technology'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 5',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'technology'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 6',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'horror'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 7',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'horror'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 8',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'horror'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 9',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'horror'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 10',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'horror'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 11',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'comedy'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 12',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'comedy'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 13',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'comedy'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 14',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'comedy'
  );
INSERT INTO premium_podcasts (title, url_thumbnail, description, category)
VALUES (
    'Contoh Judul Podcast 15',
    'escape.jpg',
    'Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'comedy'
  );
INSERT INTO premium_episodes (
    title,
    description,
    url_thumbnail,
    url_audio,
    id_podcast
  )
VALUES (
    'Judul Episode 1',
    'Contoh deskripsi episode bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'escape.jpg',
    'audiotester.mp3',
    1
  );
INSERT INTO premium_episodes (
    title,
    description,
    url_thumbnail,
    url_audio,
    id_podcast
  )
VALUES (
    'Judul Episode 2',
    'Contoh deskripsi episode bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'escape.jpg',
    'sample.mp3',
    1
  );
INSERT INTO premium_episodes (
    title,
    description,
    url_thumbnail,
    url_audio,
    id_podcast
  )
VALUES (
    'Judul Episode 3',
    'Contoh deskripsi episode bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'escape.jpg',
    'audiotester.mp3',
    3
  );
INSERT INTO premium_episodes (
    title,
    description,
    url_thumbnail,
    url_audio,
    id_podcast
  )
VALUES (
    'Judul Episode 4',
    'Contoh deskripsi episode bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'escape.jpg',
    'sample.mp3',
    3
  );
INSERT INTO premium_episodes (
    title,
    description,
    url_thumbnail,
    url_audio,
    id_podcast
  )
VALUES (
    'Judul Episode 5',
    'Contoh deskripsi episode bisa panjang banget batesnya 150 karakter sampe tiga baris',
    'escape.jpg',
    'audiotester.mp3',
    3
  );
