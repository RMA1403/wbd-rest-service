import { Category } from "@prisma/client";
import { App } from "../app";

export default async function restSeed() {
  const podcastData = [];
  const episodeData = [];

  // Create 100 podcasts, each with 10 to 20 episodes
  for (let i = 1; i <= 1000; i++) {
    const category =
      i % 3 === 0 ? "HORROR" : i % 3 === 1 ? "TECHNOLOGY" : "COMEDY";
    podcastData.push({
      // id_podcast: i,
      title: `Podcast ${i}`,
      url_thumbnail: i % 2 === 0 ? "escape.jpg" : "hello.jpg",
      description: `Description for Podcast ${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla erat lacus, cursus vel arcu ut, blandit euismod ex. Pellentesque eu magna vehicula odio laoreet maximus eget eu neque. Nullam nec euismod arcu, id tincidunt magna.`,
      category: category as Category,
      id_user: (i % 100) + 1,
    });

    // Generate random number of episodes (between 10 and 20)
    const numEpisodes = Math.floor(Math.random() * (20 - 10 + 1) + 10);

    // Create 10 to 20 episodes for each podcast
    for (let j = 1; j <= numEpisodes; j++) {
      const audioFileName = j % 2 === 0 ? "audiotester.mp3" : "sample.mp3";
      const imageFileName = j % 2 === 0 ? "escape.jpg" : "hello.jpg";

      episodeData.push({
        title: `Episode ${j} of Podcast ${i}`,
        description: `Description for Episode ${j} of Podcast ${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla erat lacus, cursus vel arcu ut, blandit euismod ex. Pellentesque eu magna vehicula odio laoreet maximus eget eu neque. Nullam nec euismod arcu, id tincidunt magna.`,
        url_thumbnail: imageFileName,
        url_audio: audioFileName,
        id_podcast: i,
      });
    }
  }

  await App.prismaClient.premiumPodcasts.createMany({
    data: podcastData,
  });
  await App.prismaClient.premiumEpisodes.createMany({
    data: episodeData,
  });
}
