var schema = new Schema({
    name: {
        type: String,
        default: ""
    },

    order: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["true", "false"]
    },

    logo: {
        type: String,
        default: ""
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Clients', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
     
     getAll: function (data, callback) {
        Clients.find({}).exec(function (err, found) {

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