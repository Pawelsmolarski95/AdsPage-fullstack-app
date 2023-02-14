const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string"
    ) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        return (
        res
          .status(409)
          .send({ message: "User with this login already exists" }));
      }
      const newUser = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
      });
      res.status(201).send({ message: "User created: " + newUser.login });
    } else {
      res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.login = async (req, res) => {
  res.send("Working");
};
