import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: path.resolve(import.meta.filename, "../uploads"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name.replace(/\s/g, "")}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;
