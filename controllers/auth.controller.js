const fs = require("fs");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const getImageFileType = require("../utlis/getImageFileType");

exports.register = async (req, res) => {
  try {

    const { login, password, phone } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (login && typeof login === 'string' && password && typeof password === 'string' && phone && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {

      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        fs.unlinkSync(req.file.path);
        return res.status(409).send({ message: 'User with this login already exists' });
      }
      const user = new User({login, password: await bcrypt.hash(password, 10), phone, avatar: req.file.filename});
      await user.save();
      res.status(201).json({ message: 'User created ' + user.login });
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
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
          req.session.login = loginUser.login;
          req.session.id = loginUser.id;
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

exports.getUser = async (req, res) => {
  res.send({ message: "You are logged!" });
};

exports.logout = async (req, res) => {
  req.session.destroy();
  res.send({ message: "You are logout!" });
};
