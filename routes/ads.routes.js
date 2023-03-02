const express = require("express");
const router = express.Router();
const AdsControllers = require("../controllers/ads.controller");
const imageUpload = require("../utlis/imageUpload");

router.get("/ads", AdsControllers.getAll);

router.get("/ads/:id", AdsControllers.getById);

router.post("/ads", imageUpload.single("image"), AdsControllers.addAds);

router.put("/ads/edit/:id",imageUpload.single("image"), AdsControllers.editAds);

router.delete("/ads/:id", AdsControllers.removeAds);

router.get("/ads/search/:searchPhrase", AdsControllers.findSearchAds);

module.exports = router;
