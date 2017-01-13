var objectid = require("mongodb").ObjectId;
var request = require("request");
var schema = new Schema({
    name: String,
    mobile: String,
    email:  String,


     enquiryFor: {
        type: String,
        enum: ["PP/PE Liners", "POF Shrink Film", "PET Bottles", "Speciality Films"]
    },
    message: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Enquiry', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    sendEnquiryEmail: function (data, callback) {
        var contactusdata = data;

        console.log(data);
        contactusdata = this(contactusdata);
        contactusdata.save(function (err, data) {
            if (err) {
                callback(err, null);
            } else {

                var emailData = {};
                emailData.email = "pratik.gawand@wohlig.com";
                emailData.cc = "pratik.gawand@wohlig.com";
                emailData.content = data;
                emailData.filename = "enquiryemailer.ejs";
                emailData.subject = "Alpha Enquiry";
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