const { User, UserCredential } = require("../models/User");
const mongoose = require("mongoose");
const mongoURI = require("../config/configBasic").mongoDB.mongoURI;

const seedDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("MongoDB Connected...");

    // Start session for transaction
    // mongoose version 5.2 or greater is must
    // mongoose.startSession() must be after mongoose connection i.e; after mongoose.connect() function
    const session = await mongoose.startSession();
    try {
      // const opts = { session };
      //See if User Exists
      let user = await User.findOne({ email: "admin@123.com" });

      if (user) {
        console.log("User already exists");
        process.exit(1);
      }
      const adminUserData = {
        name: "Admin last",
        email: "admin@123.com",
        role: "admin",
        contact_no: "213213",
        country: "Pakistan",
        city: "Lahore",
        address: "Johr Town, Lahore",
        is_email_verified: true,
      };
      let newAdminUser = new User(adminUserData);

      const adminUserCredentialData = {
        password:
          "$2b$10$fpjwO.OCpWIKfsni6FtSC.qjZju88aETl3LylTPz2Li5dZCiJgIr2", //123456
      };
      let newAdminCredentials = new UserCredential(adminUserCredentialData);

      // Transaction starts from here
      session.startTransaction();

      const saveAdmin = await newAdminUser.save({ session });
 
      newAdminCredentials.user = saveAdmin._id;
      const saveAdminCredentials = await newAdminCredentials.save({ session });

      if (saveAdmin && saveAdminCredentials) {
        // commit the changes if everything was successful
        await session.commitTransaction();
        // ending session
        session.endSession();

        console.log("admin created successfully");

        process.exit(1);
      }
    } catch (error) {
      // this will rollback any changes made in the database
      await session.abortTransaction();
      // ending session
      session.endSession();

      console.log("transaction error: ", error);

      //Exit process with Failure
      process.exit(1);
    }
  } catch (error) {
    console.log("mongo connection error", error.message);
    //Exit Process with Failure
    process.exit(1);
  }
  //Mongoose Deprication Warning
  mongoose.set("useFindAndModify", false);
};

seedDb();
