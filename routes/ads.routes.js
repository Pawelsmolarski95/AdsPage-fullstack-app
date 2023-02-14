const express = require('express');
const router = express.Router();
const AdsControllers = require('../controllers/ads.controller');

router.route('/ads').get(AdsControllers.getAll);

router.route('/ads/:id').get(AdsControllers.getById);

router.route('/ads').post(AdsControllers.addAds);

router.route('/ads/edit').put(AdsControllers.editAds);

router.route('/ads/:id').delete(AdsControllers.removeAds);

router.route('/ads/search/:searchPhrase').get(AdsControllers.findSearchAds);

module.exports = router;