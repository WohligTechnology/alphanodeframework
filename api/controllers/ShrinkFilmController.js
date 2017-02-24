module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    
    saveShrinkPhotos: function (req, res) {
        if (req.body) {
            ShrinkFilm.saveShrinkPhotos(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    removeShrinkPhotos: function (req, res) {
        if (req.body) {
            ShrinkFilm.removeShrinkPhotos(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    findOneShrink: function (req, res) {
        if (req.body) {
            ShrinkFilm.findOneShrink(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    updateShrinkGalleryPhotos: function (req, res) {
        if (req.body) {
            ShrinkFilm.updateShrinkGalleryPhotos(req.body, res.callback);
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

    saveShrinkTestimonial: function (req, res) {
        if (req.body) {
            ShrinkFilm.saveShrinkTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    removeShrinkTestimonial: function (req, res) {
        if (req.body) {
            ShrinkFilm.removeShrinkTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    findOneShrinkTestimonial: function (req, res) {
        if (req.body) {
            ShrinkFilm.findOneShrinkTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

       updateShrinkTestimonial: function (req, res) {
        if (req.body) {
            ShrinkFilm.updateShrinkTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

};
module.exports = _.assign(module.exports, controller);