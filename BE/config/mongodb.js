import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/e-comerce`, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useFindAndModify: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
