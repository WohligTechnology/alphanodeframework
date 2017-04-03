module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    saveProductsPhotos: function (req, res) {
        if (req.body) {
            Products.saveProductsPhotos(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    removeProductsPhotos: function (req, res) {
        if (req.body) {
            Products.removeProductsPhotos(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    findOneProducts: function (req, res) {
        if (req.body) {
            Products.findOneProducts(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    updateGalleryPhotos: function (req, res) {
        if (req.body) {
            Products.updateGalleryPhotos(req.body, res.callback);
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

    saveTestimonial: function (req, res) {
        if (req.body) {
            Products.saveTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    removeTestimonial: function (req, res) {
        if (req.body) {
            Products.removeTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    findOneTestimonial: function (req, res) {
        if (req.body) {
            Products.findOneTestimonial(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    updateTestimonial: function (req, res) {
        if (req.body) {
            Products.updateTestimonial(req.body, res.callback);
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
            Products.getAll(req.body, res.callback);
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