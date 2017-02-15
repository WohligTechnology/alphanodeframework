var schema = new Schema({
    pselect: {
        type: String,
        enum: ["Flexible", "Rigid"]
    },
    name: {
        type: String,
        default: ""
    },

    content: {
        type: String,
        default: ""
    },
    desktopimage: {
        type: String
    },
    mobileimage: {
        type: String
    },
    gallery: [{
        image: {
            type: String,
            default: ""
        }
    }],
    testimonial: [{
        name: {
            type: String,
            default: ""
        },
        cname: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },

        content: {
            type: String
        },

        order: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["true", "false"]
        }
    }]

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Products', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    saveProductsPhotos: function (data, callback) {

        console.log(data);
        Products.findOneAndUpdate({
            _id: data._id
        }, {
            $push: {

                gallery: {
                    $each: [{
                        image: data.images,

                    }]
                }
            }
        }).exec(function (err, found) {

            if (err) {
                // console.log(err);
                callback(err, null);
            } else {

                if (found) {

                    callback(null, found);
                } else {
                    old
                    callback(null, {
                        message: "No Data Found"
                    });
                }
            }

        })
    },

    removeProductsPhotos: function (data, callback) {

        console.log("DATA", data);
        Products.update({

            "_id": data._id,
            "gallery": {
                $elemMatch: {
                    image: data.images
                }
            }
        }, {
            $pull: {
                gallery: {
                    image: data.images
                }
            }
        }, function (err, updated) {
            console.log(updated);
            if (err) {
                console.log(err);
                callback(err, null);
            } else {


                callback(null, updated);
            }
        });
    },

    findOneProducts: function (data, callback) {


        Products.findOne({
            _id: data._id
        }).deepPopulate("gallery").exec(function (err, found) {

            if (err) {

                callback(err, null);
            } else {

                if (found) {
                    console.log("Found", found);
                    callback(null, found);
                } else {
                    callback(null, {
                        message: "No Data Found"
                    });
                }
            }

        })
    },
    updateGalleryPhotos: function (data, callback) {

        console.log("DATA", data);
        Products.update({
            _id: data._id,

            "gallery": {
                $elemMatch: {
                    image: data.old
                }
            }
        }, {
            $set: {
                "gallery.$.image": data.photo

            }
        }, function (err, updated) {
            console.log(updated);
            if (err) {
                console.log(err);
                callback(err, null);
            } else {


                callback(null, updated);
            }
        });
    },


    //testimonial-----


    saveTestimonial: function (data, callback) {

        console.log(data);
        Products.findOneAndUpdate({
            _id: data._id
        }, {
            $push: {

                testimonial: {
                    $each: [{
                        name: data.name,
                        cname: data.cname,
                        city: data.city,
                        content: data.content,
                        order: data.order,
                        status: data.status

                    }]
                }
            }
        }).exec(function (err, found) {

            if (err) {
                // console.log(err);
                callback(err, null);
            } else {

                if (found) {

                    callback(null, found);
                } else {
                    old
                    callback(null, {
                        message: "No Data Found"
                    });
                }
            }

        })
    },

    removeTestimonial: function (data, callback) {

        console.log("DATA", data);
        Products.update({
            "_id": data._id,

            "testimonial": {
                $elemMatch: {
                    _id: data.testid
                }
            }
        }, {
            $pull: {
                testimonial: {
                    _id: data.testid
                }
            }
        }, function (err, updated) {
            console.log(updated);
            if (err) {
                console.log(err);
                callback(err, null);
            } else {


                callback(null, updated);
            }
        });
    },

    findOneTestimonial: function (data, callback) {


        Products.findOne({
            _id: data._id
        }).deepPopulate("testimonial").exec(function (err, found) {

            if (err) {

                callback(err, null);
            } else {

                if (found) {
                    console.log("Found", found);
                    callback(null, found);
                } else {
                    callback(null, {
                        message: "No Data Found"
                    });
                }
            }

        })
    },

    updateTestimonial: function (data, callback) {

        console.log("DATA", data);
        //var testData = {};
        //testData.name  = data.name
        Products.update({
            _id: data._id,

            "testimonial": {
                $elemMatch: {
                    _id: data.testi_id
                }
            }
        }, {
            $set: {
                "testimonial.$.name": data.name,
                "testimonial.$.cname": data.cname,
                "testimonial.$.city": data.city,
                "testimonial.$.content": data.content,
                "testimonial.$.order": data.order,
                "testimonial.$.status": data.status
            }
        }, function (err, updated) {
            console.log(updated);
            if (err) {
                console.log(err);
                callback(err, null);
            } else {


                callback(null, updated);
            }
        });
    },

};
module.exports = _.assign(module.exports, exports, model);