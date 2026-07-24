import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file provided" });
  }

  try {
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blognest" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();
    res.status(200).json({ success: true, url: result.secure_url });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
