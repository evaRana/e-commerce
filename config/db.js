const mongoose = require('mongoose');

//const uri = "mongodb+srv://rana22iva:<password>@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority";
const uri ="mongodb+srv://rana22iva:CPhQ2MWvXYHbfYGB@ecomm-db.hrbmp.mongodb.net/?retryWrites=true&w=majority&appName=ecomm-db";

const connectDB = async () => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, 
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1); 
    }
  };
  
  module.exports = connectDB;


