var schema = new Schema({
    name: {
        type: String,
        default: ""
    },

    content: {
        type: String,
        default: ""
    },

    order: {
        type: Number,
        default: 0
    },

    logo: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: ["true", "false"]
    },
    link: {
        type: String
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('LatestNews', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);