const jwt = require("jsonwebtoken");
const User = require("../model/user");
const coonectedDatabase = require("../connection/connection");
const bcrypt = require("bcrypt");
const user = require("../model/user");

//i need to login with an email and password so they both have to be stored in my database

const loginUser = async (req, res) => {
  try {
    await coonectedDatabase();

    const { email, password } = req.body;
    const user = await User.findOne({ email: email.trim().toLowerCase() }); // Ensure email is trimmed and lowercased for consistency
    if (user) {
      console.log("Checking password for user:", user.email);
    }
    if (!user) {
      //if no user found get the f* out of here
      return res.status(404).json({ msg: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        msg: "password is not matched",
      });
    }
    console.log("Match result:", isPasswordMatched);

    //if we reached this stage therefore the user already registered
    //we need to create a dynamic jwt and token
    const payToll = {
      id: user._id,
      username: user.username,
    };
    const token = jwt.sign(payToll, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      msg: "1",
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, profession, wilaya, adress, NumTel } =
    req.body;

  try {
    await coonectedDatabase();
    // if the user already registerd with the same email

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (existingUser) {
      return res.status(400).json({ msg: "user already exists" });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      profession,
      wilaya,
      adress,
      NumTel,
    });

    const paytoll = {
      id: newUser._id,
      username: newUser.username,
    };
    const token = await jwt.sign(paytoll, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // That now i have the token i need to send with a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      //enable cookie for cross-site access
      partitioned: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // i have to create token
    res.status(201).json({
      msg: "user created successfully",
      // i Need to send the token !!!!!!!!!!!!!!!!!!!!!!
      token: token, // since i am sending the token before then data object that wrapps the newuser in the frontend i need to define  this way  localStorage.setItem('token', result.token);
      data: newUser,
    });
  } catch (error) {
    console.error("DEBUG - Registration Controller Error:", error);

    res.status(500).json({
      msg: "Server error",
      details: error.message, // This will tell you if it's a validation error or connection error
      name: error.name, // This tells you if it's a ValidationError, TypeError, etc.
    });
  }

  //  res.send('we will soon include the ability to users to register')
};

const testAuthRouter = async (req, res) => {
  try {
    res.send("夜空を照らす光――それは、見る者を魅了する光景です");
  } catch (error) {}
};

const safeModification = async (req, res) => {
  try {
    await coonectedDatabase();
    if (req.user.id !== req.params.id) {
      return res
        .status(401)
        .json({ msg: "You are not authorized to update this user" });
    }
    /*const {
      username ,
      password ,
      email 
    } = req.user 

     */
    const { username, password, email } = req.body;
    ///DEFINE AN EMPTY OBJECT TO STORE THE DATA FIEKDS I SPECIFY
    const updatedData = {};
    if (username) updatedData.username = username;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      updatedData.password = hashedPassword;
    }
    if (email) updatedData.email = email;

    const findUserAndUpdate = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true },
    );
    if (!findUserAndUpdate) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({
      msg: "User updated successfully",
      data: findUserAndUpdate,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const getUserInfos = async (req, res) => {
  // const {id} = req.params  wtf is this we will no longer pass id in the url only throughtout the middlewares
  try {
    await coonectedDatabase();
    const userId = await User.findById(req.user.id);
    if (!userId) {
      return res.status(404).json({ msg: "User not found" });
    }
    const userObject = userId.toObject();
    delete userObject.password;
    res.status(200).json(userObject);
  } catch (error) {
    console.error("DEBUG - Get User Info Error:", error);
    res.status(500).json({ msg: "Server error", details: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
  testAuthRouter,
  safeModification,
  getUserInfos,
};
