require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const coonectedDatabase = require('./connection/connection')
const testRouter = require('./routes/test.route')
const Port = 5001
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true, // siri jidan lol
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use('/api' , testRouter )

const startServer = async () => {
  try {
    const isConnected = await coonectedDatabase();
    if (!isConnected) {
      console.log("database not  connected");
    }
    console.log("database connected");
  } catch (error) {
    console.error(error);
  }
};
startServer();
///outside the function that starts the server i define the production type
if (process.env.NODE_ENV  !== "production") {
  app.listen(Port, () => {
    console.log("now you are on the localhost  noob haha");
    console.log("NODE_ENV is currently:", process.env.NODE_ENV);
  });
}

module.exports = app;

console.log("test test");
