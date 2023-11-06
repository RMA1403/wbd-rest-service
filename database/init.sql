CREATE TYPE category AS ENUM ('technology', 'horror', 'comedy');
CREATE TABLE IF NOT EXISTS dummy_table ("description" VARCHAR(50));
CREATE TABLE IF NOT EXISTS premium_podcasts (
  id_podcast SERIAL PRIMARY KEY,
  title VARCHAR(50),
  url_thumbnail VARCHAR(100),
  description VARCHAR(1000),
  category category
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