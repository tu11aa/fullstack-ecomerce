import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import configCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
configCloudinary();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Preferred-Currency", // Added the currency header
    ],
  })
);

app.get("/test", (_, res) => res.status(200).send("Hello world"));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
