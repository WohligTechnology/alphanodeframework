var objectid = require("mongodb").ObjectId;
var request = require("request");
var schema = new Schema({
    name: String,
    mobile: String,
    email: String,
    resume: String,
    message: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Careers', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    sendCareersEmail: function (data, callback) {
        var careerdata = data;

        console.log(data);
        careerdata = this(careerdata);
        careerdata.save(function (err, data) {
            if (err) {
                callback(err, null);
            } else {

                var emailData = {};
                emailData.email = "pratik.gawand@wohlig.com";
                emailData.cc = "pratik.gawand@wohlig.com";
                emailData.content = data;
                emailData.filename = "emailer.ejs";
                emailData.subject = "Alpha  Careers";
                Config.email(emailData, function (err, emailRespo) {
                    if (err) {
                        console.log("EROR in EMAIL CONFIG", err);
                        callback(err, null);
                    } else {
                        console.log(emailRespo);

                        callback(null, data);
                    }
                    //   callback(null, data);
                });
            }
        });
    }
};
module.exports = _.assign(module.exports, exports, model);