var schema = new Schema({
    name: {
        type: String,
        default: " "
    },
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
var model = {

    getAll: function (data, callback) {
        Journey.find({}).exec(function (err, found) {

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

};
module.exports = _.assign(module.exports, exports, model);