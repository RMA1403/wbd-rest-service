import { Request, Response } from "express";
import { App } from "../app";
import { Category } from '@prisma/client';


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
                category: genre as Category ? genre as Category : undefined,
            }
            });

            return res.status(200).send({ podcasts: podcasts });
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
                    },
                    title: {
                        contains: req.query.keyword as string ? req.query.keyword as string : undefined,
                        mode: 'insensitive',
                    },
                },
            });

            return res.status(200).send({ episodes: episodes });
        };
    }
}