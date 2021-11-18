import multer from "multer";
import multerS3 from "multer-s3-transform";
import sharp from "sharp";
import AWS from "aws-sdk";
// require('dotenv').config();
import dotenv from "dotenv";
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: "AKIARCNRLSCXDBSGO6P4",
  secretAccessKey: "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",
  region: "ap-northeast-2",
   });

export const uploadSingle = multer({
  storage: multerS3({
    s3: s3,
    bucket: "honey-tip-post-picture-upload",
    limits: { fileSize: 10 * 1024 * 1024,files: 5 },
    shouldTransform: function (req, file, cb) {
      cb(null, /^image/i.test(file.mimetype));
    },
    transforms: [
      {
        id: "original",
        key: function (req, files, cb) {
          cb(null, `${Date.now()}${files.originalname}`); //use Date.now() for unique file keys
        },
        transform: function (req, file, cb) {
          //Perform desired transformations
          cb(null, sharp().resize(300, 300).withMetadata());
        },
      },
      
    ],
    
  }),

});