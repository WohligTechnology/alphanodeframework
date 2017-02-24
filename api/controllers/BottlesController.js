module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    saveBottlesPhotos: function (req, res) {
        if (req.body) {
            Bottles.saveBottlesPhotos(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    removeBottlesPhotos: function (req, res) {
        if (req.body) {
            Bottles.removeBottlesPhotos(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    findOneBottles: function (req, res) {
        if (req.body) {
            Bottles.findOneBottles(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    updateBottlesGalleryPhotos: function (req, res) {
        if (req.body) {
            Bottles.updateBottlesGalleryPhotos(req.body, res.callback);
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

    saveBottlesTestimonial: function (req, res) {
        if (req.body) {
            Bottles.saveBottlesTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    removeBottlesTestimonial: function (req, res) {
        if (req.body) {
            Bottles.removeBottlesTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    findOneBottlesTestimonial: function (req, res) {
        if (req.body) {
            Bottles.findOneBottlesTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    updateBottlesTestimonial: function (req, res) {
        if (req.body) {
            Bottles.updateBottlesTestimonial(req.body, res.callback);
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