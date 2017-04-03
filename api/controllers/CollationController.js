module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    saveCollationPhotos: function (req, res) {
        if (req.body) {
            Collation.saveCollationPhotos(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    removeCollationPhotos: function (req, res) {
        if (req.body) {
            Collation.removeCollationPhotos(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    findOneCollation: function (req, res) {
        if (req.body) {
            Collation.findOneCollation(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    updateCollationGalleryPhotos: function (req, res) {
        if (req.body) {
            Collation.updateCollationGalleryPhotos(req.body, res.callback);
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

    saveCollationTestimonial: function (req, res) {
        if (req.body) {
            Collation.saveCollationTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    removeCollationTestimonial: function (req, res) {
        if (req.body) {
            Collation.removeCollationTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    findOneCollationTestimonial: function (req, res) {
        if (req.body) {
            Collation.findOneCollationTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    updateCollationTestimonial: function (req, res) {
        if (req.body) {
            Collation.updateCollationTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    //get all

    getAll: function (req, res) {
        if (req.body) {
            Collation.getAll(req.body, res.callback);
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