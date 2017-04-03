var schema = new Schema({
    collName: {
        type: String,
        default: "Collation"
    },
    saveStatus: {
        type: Boolean,
        default: false
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
module.exports = mongoose.model('Collation', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    saveCollationPhotos: function (data, callback) {

        // console.log(data);
        // Collation.findOneAndUpdate({}, {
        //     _id: data._id
        // }, {
        //     $push: {
        //         gallery: {
        //             $each: [{
        //                 image: data.images1,
        //                 thumbimage: data.images2
        //             }]
        //         }
        //     }
        // }).exec(function (err, found) {

        //     if (err) {
        //         // console.log(err);
        //         callback(err, null);
        //     } else {

        //         if (found) {

        //             callback(null, found);
        //         } else {
        //             callback(null, {
        //                 message: "No Data Found"
        //             });
        //         }
        //     }

        // })

        Collation.findOne({
                saveStatus: true
            })
            .lean()
            .exec(function (err, collData) {
                console.log("collData", collData);
                if (err) {
                    callback(err, null);
                } else {
                    if (_.isEmpty(collData)) {
                        console.log("empty", collData);
                        Collation.saveData({
                            saveStatus: true
                        }, function (err, saveStatus) {
                            console.log("saveStatus", saveStatus);
                            if (err) {
                                callback(err, null);
                            } else {
                                if (_.isEmpty(saveStatus)) {
                                    callback("SAVE DATA EMPTY", saveStatus);
                                } else {
                                    //   callback(null, saveStatus);
                                    Collation.findOneAndUpdate({
                                        collName: "Collation"
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

                                    });
                                }

                            }
                        });
                    } else {
                        console.log("update", collData);
                        Collation.findOneAndUpdate({
                            collName: "Collation"
                        }, {
                            $push: {
                                gallery: {
                                    $each: [{
                                        image: data.images1,
                                        thumbimage: data.images2
                                    }]
                                }
                            }
                        }, {
                            new: true
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

                        });
                    }
                }
            });
    },

    removeCollationPhotos: function (data, callback) {

        console.log("DATA", data);
        Collation.update({

            saveStatus: true,
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


    findOneCollation: function (data, callback) {
        Collation.findOne({
            saveStatus: true,
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

    updateCollationGalleryPhotos: function (data, callback) {

        console.log("DATA", data);

        Collation.update({
            saveStatus: true,

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


    saveCollationTestimonial: function (data, callback) {
        Collation.findOne({
                saveStatus: true
            })
            .lean()
            .exec(function (err, collData) {
                console.log("collData", collData);
                if (err) {
                    callback(err, null);
                } else {
                    if (_.isEmpty(collData)) {
                        console.log("empty", collData);
                        Collation.saveData({
                            saveStatus: true
                        }, function (err, saveStatus) {
                            console.log("saveStatus", saveStatus);
                            if (err) {
                                callback(err, null);
                            } else {
                                if (_.isEmpty(saveStatus)) {
                                    callback("SAVE DATA EMPTY", saveStatus);
                                } else {
                                    //callback(null, saveStatus);
                                    Collation.findOneAndUpdate({
                                        collName: "Collation"
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
                                                callback(null, {
                                                    message: "No Data Found"
                                                });
                                            }
                                        }

                                    });
                                }

                            }
                        });
                    } else {
                        console.log("update", collData);
                        Collation.findOneAndUpdate({
                            collName: "Collation"
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
                        }, {
                            new: true
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

                        });
                    }
                }
            });

    },

    removeCollationTestimonial: function (data, callback) {

        console.log("DATA", data);
        Collation.update({
            saveStatus: true,

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

    findOneCollationTestimonial: function (data, callback) {


        Collation.findOne({
            saveStatus: true
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

    updateCollationTestimonial: function (data, callback) {

        console.log("DATA", data);
        //var testData = {};
        //testData.name  = data.name
        Collation.update({
            saveStatus: true,

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
        Collation.find({}).exec(function (err, found) {

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