const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI ?? "mongodb://localhost:27017";
mongoose.set("strictQuery", true);
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "cutshort-assignment",
};
module.exports = () => {
  mongoose
    .connect(mongoUri, mongoOptions)
    .then((resp) => {
      console.log("Connected to Database: " + resp.connection.host + "/" + mongoOptions.dbName);
    })
    .catch((err) => {
      console.log("error", err);
    });

  mongoose.connection.on("error", console.error.bind(console, "connection error:"));
};
