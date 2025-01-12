import { v2 as cloudinary } from "cloudinary";

export const uploadImages = async (images) => {
  let imageUrls = await Promise.all(
    images.map(async (image) => {
      let result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });
      return result.secure_url;
    })
  );
  return imageUrls;
};
