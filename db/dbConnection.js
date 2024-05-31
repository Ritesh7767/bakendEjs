const mongoose = require("mongoose")

// mongoose.connect("mongodb+srv://ritesh7767:Ritesh7767@cluster0.gl85cov.mongodb.net/")

const connectDB = async () => {
    try{
        // const connectionInstance = await mongoose.connect('mongodb+srv://ritesh7767:Ritesh7767@cluster0.gl85cov.mongodb.net/firstBackend')
        const connectionInstance = await mongoose.connect('mongodb+srv://ritesh776782:Ritesh7767@cluster0.nde7hq2.mongodb.net/firstBackend')
        console.log("Database connected !! ", connectionInstance.connection.host)
    }
    catch(err){
        console.log("Error while connecting to db", err)
    }
}

module.exports = connectDB

