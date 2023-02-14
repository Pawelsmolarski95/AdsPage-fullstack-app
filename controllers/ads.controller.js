const Ads = require('./../models/ads.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Ads.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const adsById = await Ads.findById(req.params.id);
        if(!adsById) {
            res.status(404).json({ message: 'Not found'});
        } else {
            res.json(adsById);
        }
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.addAds = async (req, res) => {
    try {
        const {title, description, data, price, location, infoSeller } = req.body;
        const newAds = new Ads({
            title: title,
            description: description,
            data: data,
            price: price,
            location: location,
            infoSeller: infoSeller
        });
        await newAds.save();
        res.json({ message: 'OK' }); 
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.removeAds = async (req, res) => {
    try {
        const deleteAds = await Ads.findById(req.params.id);
        if(!deleteAds) {
            res.status(404).json({ message: 'Not found'});
        } else {
            await Ads.deleteOne(req.params.id);
            res.json({ message: 'OK'});
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.editAds = async (req, res) => {
    try {
        const editedAds = await Ads.findById(req.params.id);
        if(!editedAds) {
            res.status(404).json({ message: 'Not found'});
        } else {
            await Ads.updateOne({ _id:req.params.id },{
                $set: {
                    title: title,
                    description: description,
                    data: data,
                    price: price,
                    location: location,
                    infoSeller: infoSeller
                }
            })
            res.json({ message: 'OK'});
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.findSearchAds = async (req, res) => {
    try {
        const findPhraseAds = await Ads.find({ title: req.params.searchPhrase });
        if(!findPhraseAds) {
            res.status(404).json({ message: 'Not found'});
        } else {
            res.json(findPhraseAds);
            res.json({ message: 'OK' });
        }    
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
}