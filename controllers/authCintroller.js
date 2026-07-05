const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcrypt");

//i need to login with an email and password so they both have to be stored in my database

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email : email.trim().toLowerCase() }); // Ensure email is trimmed and lowercased for consistency
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
      msg: "Login successful",
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // if the user already registerd with the same email
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ msg: "user already exists" });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });
    res.status(201).json({
      msg: "user created successfully",
        data : newUser
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ msg: "An unexpected error occurred. Please try again later." });
  }

  //  res.send('we will soon include the ability to users to register')
};

const testAuthRouter = async (req, res) => {
  try {
    res.send("夜空を照らす光――それは、見る者を魅了する光景です");
  } catch (error) {}
};
module.exports = {
  loginUser,
  registerUser,
  testAuthRouter,
};
