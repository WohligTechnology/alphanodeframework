var schema = new Schema({
    name: {
        type: String,
        default: ""
    },

    content: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: 0
    },

    homepageimage: {
        type: String,
        default: ""
    },
    innerpageimage: {
        type: String,
        default: ""
    },
    relatedimage: {
        type: String,
        default: ""
    },
    relatednews:{
         type: [{
            type: Schema.Types.ObjectId,
            ref: "LatestNews",
        }],
        index: true,
        //restrictedDelete: true
    },
    status: {
        type: String,
        enum: ["true", "false"]
    }
});

schema.plugin(deepPopulate, {
    populate:{
        'relatednews':{
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('LatestNews', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,"relatednews","relatednews"));
var model = {

    getAll: function (data, callback) {
        LatestNews.find({}).exec(function (err, found) {

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