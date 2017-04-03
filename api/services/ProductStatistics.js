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
var model = {

    getAll: function (data, callback) {
        ProductStatistics.find({}).exec(function (err, found) {

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