module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

sendEnquiryEmail: function (req, res) {
        if (req.body) {
            console.log("CNTRL", req.body);
            Enquiry.sendEnquiryEmail(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    }

};
module.exports = _.assign(module.exports, controller);