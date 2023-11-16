import { Request, Response } from "express";
import { App } from "../app"

export class PlaylistController {
    getUserPlaylists() {
        return async (req: Request, res: Response) => {
            try { 
              const { idUser } = req.params;
      
              if(!idUser) {
                return res.status(400).json({ message: "missing id" });
              }
      
              const playlists = await App.prismaClient.premiumPlaylist.findMany({
                select: {
                    title:true,
                    id_playlist:true,
                },
                where: {
                    id_user: +idUser,
                }
              });
              
              return res.status(200).json({ playlists });
            }catch (err) {
              console.log(err);
              return res.status(500).json({ message: "internal server error "});
            }
          }
    };

    createPlaylist() {
        return async (req: Request, res: Response) => {
            try {
                const { title, idUser } = req.body;

                if(!title || !idUser) {
                    return res.status(400).json({ message: "incomplete request "});
                }

                await App.prismaClient.premiumPlaylist.create({
                    data:{
                        title,
                        id_user: +idUser,
                    },
                });

                return res.status(201).json({ message: "success" });
            } catch (err) { 
                console.log(err);
                return res.status(500).json({ message: "internal server error "});
            }
        }
    };

    deletePlaylist() {
        return async (req: Request, res: Response) => {
            try {
                const { idPlaylist } = req.params;

                if(!idPlaylist) {
                    return res.status(400).json({ message: "missing id"});
                }

                await App.prismaClient.premiumPlaylist.delete({
                    where: {
                        id_playlist: +idPlaylist,
                    },
                })
                return res.status(200).json({ message: "success"});
            } catch (err) {
                console.log(err);
                return res.status(500).json({ message: "internal server error" });
            }
        }
    };

    getPlaylistById() {
        return async (req: Request, res: Response) => {
            try {
                const { idPlaylist } = req.params;

                if(!idPlaylist) {
                    return res.status(400).json({ message: "missing id" });
                }

                const playlist = await App.prismaClient.premiumPlaylist.findUnique({
                    select: {
                      title: true,
                    },
                    where: {
                        id_playlist: +idPlaylist,
                    },
                });

                return res.status(200).json({ playlist });
            }catch (err) {
                console.log(err);
                return res.status(500).json({ message: "internal server error" });
            }
        }
    };

    getPlaylistPodcasts() {
        return async (req: Request, res: Response) => {
          try { 
            const { idPlaylist } = req.params;
    
            if(!idPlaylist) {
              return res.status(400).json({ message: "missing id" });
            }
    
            const podcasts = await App.prismaClient.$queryRawUnsafe(`
            SELECT id_podcast, title, description, url_thumbnail 
            FROM premium_podcasts NATURAL JOIN premium_playlist_x_podcast 
            WHERE id_playlist = ${idPlaylist} 
            `);
            
            return res.status(200).json({ podcasts });
          }catch (err) {
            console.log(err);
            return res.status(500).json({ message: "internal server error "});
          }
        }
      };
    
      addPodcastToPlaylist() {
        return async (req: Request, res: Response) => {
          try {
            const { idPlaylist, idPodcast } = req.params;
    
            if(!idPlaylist || !idPodcast) {
              return res.status(400).json({ message: "incomplete request" });
            }
    
            await App.prismaClient.premiumPlaylistxPodcast.create({
              data:{
                id_playlist: +idPlaylist,
                id_podcast: +idPodcast,
              },
            });
    
            return res.status(201).json({ message: "success" });
          } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "internal server error" });
          }
        } 
      };

      // deletePodcastFromPlaylist() {
      //   return async (req: Request, res: Response) => {
      //       try {
      //           const { idPlaylist, idPodcast } = req.params;

      //           if(!idPlaylist || !idPodcast) {
      //               return res.status(400).json({ message: "incomplete request" });
      //           }

      //           await App.prismaClient.premiumPlaylistxPodcast.delete({
      //               where: {
      //                   id_playlist: +idPlaylist,
      //                   id_podcast: +idPodcast,
      //               },
      //           });

      //           return res.status(200).json({ message: "success" });
      //       } catch (err) {
      //           console.log(err);
      //           return res.status(500).json({ message: "internal server error "});
      //       }

      //   }
      // }
}