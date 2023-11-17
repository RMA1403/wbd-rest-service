import { Request, Response } from "express";
import { App } from "../app";
import { Category } from '@prisma/client';
import fetch2 from "node-fetch";


export class SearchController {
    getPodcastByFilter() {
        return async (req: Request, res: Response) => {
            var genre = undefined;
            switch (req.query.genre as string) {
            case "technology":
                genre = Category.TECHNOLOGY;
                break;
            case "comedy":
                genre = Category.COMEDY;
                break;
            case "horror":
                genre = Category.HORROR;
                break;
            default:
                genre = undefined;
                break;
            }
            
            const podcasts = await App.prismaClient.premiumPodcasts.findMany({
                select: {
                    id_podcast: true,
                    title: true,
                    description: true,
                    url_thumbnail: true,
                },
                where: {
                    title: {
                        contains: req.query.keyword as string ?? undefined,
                        mode: 'insensitive',
                    },
                    description: {
                        contains: req.query.keyword as string ?? undefined,
                        mode: 'insensitive',
                    },
                    category: genre as Category ? genre as Category : undefined,
                }
            });

            const podcastsPHP = await fetch2(
                `http://tubes-php-app:80/public/rest/search/podcast?keyword=${req.query.keyword}&genre=${req.query.genre}`
            );

            const { podcastsNon } = await podcastsPHP.json();

            return res.status(200).send({
            premiumPodcasts: podcasts.map((res: any) => ({
                ...res,
                premium: true,
            })),
            regularPodcasts: podcastsNon.map((pod: any) => ({
                ...pod,
                premium: false,
            })),
            });
        };
    }

    getEpisodeByFilter() {
        return async (req: Request, res: Response) => {
            var genre = undefined;
            switch (req.query.genre as string) {
            case "technology":
                genre = Category.TECHNOLOGY;
                break;
            case "comedy":
                genre = Category.COMEDY;
                break;
            case "horror":
                genre = Category.HORROR;
                break;
            default:
                genre = undefined;
                break;
            }

            const episodes = await App.prismaClient.premiumEpisodes.findMany({
                select: {
                    id_episode: true,
                    title: true,
                    description: true,
                    url_thumbnail: true,
                    PremiumPodcast: {
                        select: {
                            title: true,
                        }
                    },
                },
                where: {
                    PremiumPodcast: {
                        category: genre as Category ?? undefined,
                        title: {
                            contains: req.query.keyword as string ? req.query.keyword as string : undefined,
                            mode: 'insensitive',
                        }
                    },
                    title: {
                        contains: req.query.keyword as string ? req.query.keyword as string : undefined,
                        mode: 'insensitive',
                    },
                },
            });

            const episodesPHP = await fetch2(
                `http://tubes-php-app:80/public/rest/search/episode?keyword=${req.query.keyword}&genre=${req.query.genre}`
            );

            const { episodesNon } = await episodesPHP.json();

            return res.status(200).send({
                premiumEpisodes: episodes.map((res: any) => ({
                    ...res,
                    premium: true,
                })),
                regularEpisodes: episodesNon.map((eps: any) => ({
                    ...eps,
                    premium: false,
                })),
            });
        };
    }
}