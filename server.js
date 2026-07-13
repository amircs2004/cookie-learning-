require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const coonectedDatabase = require('./connection/connection')
const testRouter = require('./routes/test.route')
const authRouter = require('./routes/auth.route')
const createFormulaRouter = require('./routes/fromul.route')
const Port = 5001
const app = express();

app.use(
  cors({
    //i need to make sure that my server accepts the the froennd requests 
    //i need to add origins inside of an array in case in the future i add more domaines
    origin: 'https://cookiefrontend.vercel.app',
    //i need to specify the methods that are allawed !!
    methods : ['GET' , 'DELETE' , 'POST' , 'PUT' , 'OPTIONS'] ,
    credentials: true, // siri jidan lol
     allowedHeaders : ['Content-Type' , 'Authorization']
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/api' , testRouter )
app.use('/api' , authRouter)
app.use('/api' , createFormulaRouter )



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
//startServer();
///outside the function that starts the server i define the production type
if (process.env.NODE_ENV  !== "production") {
  app.listen(Port, () => {
    console.log("now you are on the localhost  noob haha");
    console.log("NODE_ENV is currently:", process.env.NODE_ENV);
  });
}

module.exports = app;


