import multer, { Multer } from "multer";

export default class UploadMiddleware {
  upload: Multer;

  constructor() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        if (file.fieldname === "imageFile") {
          cb(null, "./src/storage/images");
        } else if (file.fieldname === "audioFile") {
          cb(null, "./src/storage/audio");
        }
      },
      filename: (req, file, cb) => {
        const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileName = file.originalname.split(".");
        cb(null, suffix + "." + fileName[fileName.length - 1]);
      },
    });

    this.upload = multer({ storage });
  }

  handleEpisodeUpload() {
    return this.upload.fields([
      { name: "imageFile", maxCount: 1 },
      { name: "audioFile", maxCount: 1 },
    ]);
  }
}
