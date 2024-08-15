const mongoose = require("mongoose");
const connecting = async () => {
  try {
    const mongodb = await mongoose.connect(
      "mongodb://localhost:27017/UserCollection"
    );
    if (mongodb) {
      console.log("Mongodb is connected");
    } else {
      console.log("not connected");
    }
  } catch (error) {
    console.log(`error in connecting to db ${error}`);
  }
};
module.exports = connecting;
