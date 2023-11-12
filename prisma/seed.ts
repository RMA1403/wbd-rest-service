import {App} from "../src/app";

export default async function seed() {
    // Create 100 users
    for (let i = 1; i <= 100; i++){
        await App.prismaClient.premiumUsers.createMany({
            data : {
                id_user: i,
                name: `User ${i}`,
                username: `user${i}`,
                password: `password${i}`,
                url_profpic: 'escape.jpg',
                is_admin: true,
            },
        });
    }

    // Create 100 podcasts, each with 10 to 20 episodes
    for (let i = 1; i <= 100; i++) {
        const user = await App.prismaClient.premiumUsers.findFirst({
            where: {
                id_user: i,
            },
        });

        const podcast = await App.prismaClient.premiumPodcasts.create({
            data: {
                id_podcast: i,
                title: `Podcast ${i}`,
                url_thumbnail: 'escape.jpg',
                description: `Description for Podcast ${i}`,
                category: "COMEDY",
                id_user: i,
            },
        });

        const numEpisodes = Math.floor(Math.random() * (20 - 10 + 1) + 10); // Generate random number of episodes (between 10 and 20)

        // Create 10 to 20 episodes for each podcast
        for (let j = 1; j <= numEpisodes; j++) {
            await App.prismaClient.premiumEpisodes.create({
                data: {
                    title: `Episode ${j} of Podcast ${i}`,
                    description: `Description for Episode ${j} of Podcast ${i}`,
                    url_thumbnail: 'escape.jpg',
                    url_audio: `/src/assets/episode${i}_${j}.mp3`,
                    id_podcast: i,
                },
            });
        }
    }
}
