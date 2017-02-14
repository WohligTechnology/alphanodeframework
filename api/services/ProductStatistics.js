var schema = new Schema({
    industries: {
        type: Number,
        default: " "
    },
    polymer: {
        type: Number,
        default: " "
    },
    technologies: {
        type: Number,
        default: " "
    },
    employees: {
        type: Number,
        default: " "
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('ProductStatistics', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);