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
    },
    findAllReverse: function (data, callback) {

        Careers.find({}).sort({
            _id: -1
        }).exec(function (err, data2) {
            if (err) {
                callback(null, err);
            } else {
                console.log("Data2", data2);
                callback(null, data2);
            }
        });
 },





//  findAllReverse: function (data, callback) {
//             var Model = this;
//             var Const = this(data);
//             var maxRow = Config.maxRow;

//             var page = 1;
//             if (data.page) {
//                 page = data.page;
//             }
//             var field = data.field;




//             var options = {
//                 field: data.field,
//                 filters: {
//                     keyword: {
//                         fields: ['name'],
//                         term: data.keyword
//                     }
//                 },
//                 sort: {
//                     desc: 'name'
//                 },
//                 start: (page - 1) * maxRow,
//                 count: maxRow
//             };

//             // if (defaultSort) {
//             //     if (defaultSortOrder && defaultSortOrder === "desc") {
//             //         options.sort = {
//             //             desc: defaultSort
//             //         };
//             //     } else {
//             //         options.sort = {
//             //             asc: defaultSort
//             //         };
//             //     }
//             // }

//             var Search = Model.find(data.filter)

//             .order(options)
//                 .deepPopulate(deepSearch)
//                 .keyword(options)
//                 .page(options, callback);

//         }


 
};
module.exports = _.assign(module.exports, exports, model);