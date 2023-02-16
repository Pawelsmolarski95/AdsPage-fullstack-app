const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const getImageFileType = require("../utlis/getImageFileType");

exports.register = async (req, res) => {
  try {
    const { login, password } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : null;

    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string" &&
      req.file &&
      ["image/jpeg", "image/png", "image/jpg"].includes(fileType)
    ) {
      const [, ext] = req.file.originalname.split(".");
      if (ext !== "png" && ext !== "jpg" && ext !== "jpeg") {
        return res.status(400).send({ message: "Invalid file type" });
      }
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        return res
          .status(409)
          .send({ message: "User with this login already exists" });
      }
      const newUser = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        avatar: req.file.filename,
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
