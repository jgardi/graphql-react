import mongoose from "mongoose";

import Reservation from "./reservation";

const connectDb = () => {
  if (process.env.DATABASE_URL) {
    console.log("conected to db", process.env.DATABASE_URL);
    return mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true
    });
  }
};

const models = {
  Reservation
};

export { connectDb };

export default models;
