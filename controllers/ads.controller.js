const getImageFileType = require("../utlis/getImageFileType");
const Ads = require("./../models/ads.model");
const fs = require("fs");

exports.getAll = async (req, res) => {
  try {
    res.json(await Ads.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const adsById = await Ads.findById(req.params.id);
    if (!adsById) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(adsById);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addAds = async (req, res) => {
  try {
    const { title, description, data, price, location, infoSeller } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";
    const user = req.session.user;
    console.log(req.body)
    if (
      title &&
      typeof title === "string" &&
      description &&
      typeof description === "string" &&
      price &&
      typeof price === "string" &&
      req.file &&
      ["image/jpeg", "image/png", "image/jpg"].includes(fileType) &&
      location &&
      typeof location === "string" &&
      infoSeller &&
      typeof infoSeller === "string" &&
      title.length > 5 &&
      title.length < 50 &&
      description.length > 10 &&
      description.length < 1000
    ) {
      const newAds = new Ads({
        title: title,
        description: description,
        data: data,
        price: price,
        location: location,
        infoSeller: infoSeller,
        image: req.file ? req.file.filename : "unknown",
        user: user.id,
      });
      await newAds.save();
      res.json({ message: "Created ads:" + newAds.title });
    } else {
      fs.unlinkSync(`./public/uploads/${req.file.filename}`);
      res.status(400).json({ message: "Check your title and description" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
    fs.unlinkSync(`./public/uploads/${req.file.filename}`);
  }
};

exports.removeAds = async (req, res) => {
  try {
    const deleteAds = await Ads.findById(req.params.id);
    console.log(deleteAds)
    if (!deleteAds) {
      res.status(404).json({ message: "Not found" });
    } else {
      await deleteAds.remove();
      res.json({ message: "OK" });
    }
  } catch (err) {
    res.status(500).json({ message: "err" });
  }
};

exports.editAds = async (req, res) => {
  try {
    const { title, description, data, price,location, infoSeller } = req.body;
    // const fileType = req.file ? await getImageFileType(req.file) : "unknown";
    const editedAds = await Ads.findById(req.params.id);
      console.log(editedAds)
      if (!editedAds) {
        res.status(404).json({ message: "Not found" });
      } else {
        editedAds.title = title;
        editedAds.description = description;
        editedAds.data = data ;
        editedAds.price = price;
        editedAds.location = location;
        editedAds.infoSeller = infoSeller;
        editedAds.image = image;

        await editedAds.save();
      }
      res.json({ message: "Correctly change ads" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.findSearchAds = async (req, res) => {
  try {
    const findPhraseAds = await Ads.find({ title: req.params.searchPhrase });
    if (!findPhraseAds) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(findPhraseAds);
      res.json({ message: "OK" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
