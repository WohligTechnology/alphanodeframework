var schema = new Schema({
    industries: {
        type: String,
        default: ""
    },
    polymer: {
        type: String,
        default: ""
    },
    technologies: {
        type: String,
        default: ""
    },
    employees: {
        type: String,
        default: ""
    },
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Products', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);