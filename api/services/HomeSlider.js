var schema = new Schema({
    desktopimage: {
        type: String
    },
    mobileimage: {
        type: String
    },
    ipadimage: {
        type: String
    },
    order: {
        type: Number
    },
    status: {
        type: String,
        enum: ["true", "false"]
    },
    url: {
        type: String
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('HomeSlider', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    getAll: function (data, callback) {
        HomeSlider.find({}).exec(function (err, found) {

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