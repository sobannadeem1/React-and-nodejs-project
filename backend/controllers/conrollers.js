const User = require("../models/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, username, age, password, cpassword, phone } = req.body;
    if (password !== cpassword) {
      return res.status(400).json({ message: "passwords are not matched" });
    }
    const saving = new User({
      name,
      username,
      age,
      password,
      cpassword,
      phone,
    });
    const savedb = await saving.save();
    if (savedb) {
      return res
        .status(201)
        .json({ success: true, msg: "save into db", savedb });
    }
    return res.status(400).json({ success: false, msg: " not save into db" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User doesn't exist. Try another." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Username and passwords don't match" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "8d",
    });

    res.status(200).json({
      message: "Login successful",
      token, // Send the token to the client
      user: { username: user.username, id: user._id }, // Optionally send user info
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login };
