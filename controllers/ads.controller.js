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
    const { title, description, date, price, location, user, phone} = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (title && description && date && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) && price && location && user) {
      const newAds = new Ads({ title, description, date, image: req.file.filename, price, location, user, phone});
      await newAds.save();
      res.json({ message: 'OK' });
    } else {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(400).send({ message: 'Bad request' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  };
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
    const searchResult = await Ads.find({
      title: { $regex: req.params.searchPhrase, $options: 'smi' },
    });

    res.json(searchResult);
  } catch (err) {
    res.status(500).json({ message: err.messsage });
  }
};
