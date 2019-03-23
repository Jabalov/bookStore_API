const express = require("express");
const bcrypt = require("bcrypt");
const { loginValidation, User } = require("../model/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, (req, res) => {
  res.send("login..");
});

router.post("/", auth, async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const valPassword = await bcrypt.compare(req.body.password, user.password);
  if (!valPassword) return res.status(400).send("Invalid email or password");

  res.header("x-auth-token", user.generateAuthToken()).send(user);
});

module.exports = router;
