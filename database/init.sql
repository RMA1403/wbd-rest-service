-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TECHNOLOGY', 'COMEDY', 'HORROR');

-- CreateTable
CREATE TABLE "dummy_table" (
    "description" TEXT NOT NULL
);
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
