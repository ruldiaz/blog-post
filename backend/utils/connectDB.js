const mongoose = require('mongoose');

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("DB connected succesfully");
   } catch (error) {
      console.log(`Error connecting to DB,
         ${error.message}`);
         process.exit(1);
   }
}

module.exports = connectDB;