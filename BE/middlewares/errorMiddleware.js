import dotenv from "dotenv";

dotenv.config();

const errorMiddleware = (err, req, res, next) => {
  console.error("Error middleware: ", err);
  res.status(500).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && err),
  });
};

export default errorMiddleware;
