var schema = new Schema({
    journeyimage: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: 0
    },
    content: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["true", "false"]
    },
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Journey', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);