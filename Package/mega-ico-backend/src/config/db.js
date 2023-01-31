const mongoose = require("mongoose");
const mongoURI = require("../config/configBasic").mongoDB.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error.message);
    //Exit Process with Failure
    process.exit(1);
  }
  //Mongoose Deprication Warning
  mongoose.set("useFindAndModify", false);
};

module.exports = connectDB;
