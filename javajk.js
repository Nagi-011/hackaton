require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/eduhub", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.querySelector("#signup-form input[type='text']").value;
  const email = document.querySelector("#signup-form input[type='email']").value;
  const password = document.querySelector("#signup-form input[type='password']").value;

  const response = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  alert(data.message);
});
signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.querySelector("#signup-form input[type='text']").value;
  const email = document.querySelector("#signup-form input[type='email']").value;
  const password = document.querySelector("#signup-form input[type='password']").value;

  const response = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  alert(data.message);
});