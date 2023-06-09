import mongoose from "mongoose";

//Setting up Mongoose
export const connectDB = ()=>{
    mongoose
  .connect(process.env.MONGO_URI, { dbName: "backendApi" })
  .then(() => {
    console.log("databade Connected");
  })
  .catch((e) => {
    console.log(e);
  });
}

