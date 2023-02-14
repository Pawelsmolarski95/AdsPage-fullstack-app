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
        return res
          .status(409)
          .send({ message: "User with this login already exists" });
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
  try {
    const { login, password } = req.body;

    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string"
    ) {
      const loginUser = await User.findOne({ login });
      if (!loginUser) {
        res.status(400).send({ message: "Login or password are incorrect" });
      } else {
        if (bcrypt.compareSync(password, loginUser.password)) {
          res.status(200).send({ message: "Login successful" });
        } else {
            res.status(400).send({ message: "Login or password are incorrect" });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
