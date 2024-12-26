import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/products", require("./routes/productRoute.js"));
app.use("/api/v1/users", require("./routes/userRoute.js"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
