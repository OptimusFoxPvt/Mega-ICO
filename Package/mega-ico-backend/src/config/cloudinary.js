const cloudinary = require("cloudinary");
const config = require("./configBasic");

const connectCD = async () => {
  try {
    await cloudinary.config({
      cloud_name: config.cloudnary.cloud_name,
      api_key: config.cloudnary.api_key,
      api_secret: config.cloudnary.api_secret,
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectCD;
