module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    saveAgriculturalPhotos: function (req, res) {
        if (req.body) {
            Agricultural.saveAgriculturalPhotos(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    removeAgriculturalPhotos: function (req, res) {
        if (req.body) {
            Agricultural.removeAgriculturalPhotos(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    findOneAgricultural: function (req, res) {
        if (req.body) {
            Agricultural.findOneAgricultural(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    updateAgriculturalGalleryPhotos: function (req, res) {
        if (req.body) {
            Agricultural.updateAgriculturalGalleryPhotos(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    //testimonial

    saveAgriculturalTestimonial: function (req, res) {
        if (req.body) {
            Agricultural.saveAgriculturalTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    removeAgriculturalTestimonial: function (req, res) {
        if (req.body) {
            Agricultural.removeAgriculturalTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    findOneAgriculturalTestimonial: function (req, res) {
        if (req.body) {
            Agricultural.findOneAgriculturalTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    updateAgriculturalTestimonial: function (req, res) {
        if (req.body) {
            Agricultural.updateAgriculturalTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getAll: function (req, res) {
        if (req.body) {
            Agricultural.getAll(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    }


};
module.exports = _.assign(module.exports, controller);