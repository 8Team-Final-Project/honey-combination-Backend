import multer from "multer";
import multerS3 from "multer-s3-transform";
import sharp from "sharp";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_BUCKET_REGION,
  });

export const uploadSingle = multer({
  storage: multerS3({
    s3: s3,
    bucket: "honey-tip-post-picture-upload",
    // limits: { fileSize: 100 * 7000 * 7000, files: 5 },
    shouldTransform: function (req, file, cb) {
      cb(null, /^image/i.test(file.mimetype));
    },
    transforms: [
      {
        id: "original",
        key: function (req, files, cb) {
          cb(null, `${Date.now()}${files.originalname}`);
        },
        transform: function (req, file, cb) {
          cb(null, sharp().resize(450, 450).withMetadata());
        },
      },
    ],
  }),
});
