import mongoose from "mongoose";

export const connectDB = async (req, res) => {
    //mongo server url
    const url = "mongodb://127.0.0.1:27017/finmanager";

    const {connection} = await mongoose.connect(url);

    console.log(`MongoDB Connection successful to ${connection.host}`);

}