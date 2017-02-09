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
var model = {};
module.exports = _.assign(module.exports, exports, model);