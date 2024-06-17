import mongoose from "mongoose";

async function connectToDb(uri) {
    try {
        await mongoose.connect(uri);
        console.log("Database connection is successfull!")
    } catch (error) {
        console.log(`Could not connect to database. Error: ${error}`)
    }
}

export default connectToDb;