import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Function for connect to database, DONT TOUCH IF YOU DONT KNOW SHIT

const connectToDatabase = () => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const database = await mongoose.connect(process.env.MONGODB!);
      //console.log(database);
      console.log("Connected to database");
      resolve(true);
    } catch (error) {
      console.log("Unable to connect to the database.", error);
      reject(false);
    }
  });
};

export default connectToDatabase;
