var schema = new Schema({
    pselect: {
        type: String,
        enum: ["Flexible", "Rigid"]
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
    pdf: {
        type: String
    },
    gallery: [{
        image: {
            type: String,
            default: ""
        },
        thumbimage: {
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
module.exports = mongoose.model('Bottles', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    saveBottlesPhotos: function (data, callback) {

        console.log(data);
        Bottles.findOneAndUpdate({
            _id: data._id
        }, {
            $push: {

                gallery: {
                    $each: [{
                        image: data.images1,
                        thumbimage: data.images2
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
                    callback(null, {
                        message: "No Data Found"
                    });
                }
            }

        })
    },

    removeBottlesPhotos: function (data, callback) {

        console.log("DATA", data);
        Bottles.update({

            "_id": data._id,
            "gallery": {
                $elemMatch: {
                    image: data.images,
                    thumbimage: data.thumbimages
                }
            }
        }, {
            $pull: {
                gallery: {
                    image: data.images,
                    thumbimage: data.thumbimages
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


    findOneBottles: function (data, callback) {
        Bottles.findOne({
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

    updateBottlesGalleryPhotos: function (data, callback) {

        console.log("DATA", data);

        Bottles.update({
            _id: data._id,

            "gallery": {
                $elemMatch: {
                    image: data.old,
                    thumbimage: data.old1
                }
            }
        }, {
            $set: {
                "gallery.$.image": data.photo1,
                "gallery.$.thumbimage": data.photo2

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


    saveBottlesTestimonial: function (data, callback) {

        console.log(data);
        Bottles.findOneAndUpdate({
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

    removeBottlesTestimonial: function (data, callback) {

        console.log("DATA", data);
        Bottles.update({
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

    findOneBottlesTestimonial: function (data, callback) {


        Bottles.findOne({
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

    updateBottlesTestimonial: function (data, callback) {

        console.log("DATA", data);
        //var testData = {};
        //testData.name  = data.name
        Bottles.update({
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

    //get all 

     getAll: function (data, callback) {
        Bottles.find({}).exec(function (err, found) {

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
    }

};
module.exports = _.assign(module.exports, exports, model);