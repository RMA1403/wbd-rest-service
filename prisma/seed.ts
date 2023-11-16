import { Category } from "@prisma/client";
import { App } from "../src/app";

export default async function seed() {

  const podcastData = [];
  const episodeData = [];

  for (let i = 1; i <= 100; i++) {
    await App.prismaClient.premiumUsers.create({
      data: {
        id_user: i,
        name: `User ${i}`,
        username: `user${i}`,
        password: `password${i}`,
        url_profpic: `escape.jpg`,
        is_admin: true,
      }
    })
  };

  // Create 100 podcasts, each with 10 to 20 episodes
  for (let i = 1; i <= 100; i++) {
    const user = await App.prismaClient.premiumUsers.findFirst({
      where: {
        id_user: i,
      },
    });

    const category =
      i % 3 === 0 ? "HORROR" : i % 3 === 1 ? "TECHNOLOGY" : "COMEDY";
    podcastData.push({
      id_podcast: i,
      title: `Podcast ${i}`,
      url_thumbnail: "escape.jpg",
      description: `Description for Podcast ${i}`,
      category: category as Category,
      id_user: i,
    });

    // Generate random number of episodes (between 10 and 20)
    const numEpisodes = Math.floor(Math.random() * (20 - 10 + 1) + 10);

    // Create 10 to 20 episodes for each podcast
    for (let j = 1; j <= numEpisodes; j++) {
      const audioFileName =
        j % 2 === 0 ? "audiotester.mp3" : "sample.mp3";
      episodeData.push({
        title: `Episode ${j} of Podcast ${i}`,
        description: `Description for Episode ${j} of Podcast ${i}`,
        url_thumbnail: `escape.jpg`,
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
