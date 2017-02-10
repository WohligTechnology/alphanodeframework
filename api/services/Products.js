var schema = new Schema({
    pselect: {
        type: String,
        enum: ["Flexible", "Rigid"]
    },
    name: {
        type: String,
        default: ""
    },

    content: {
        type: String,
        default: ""
    },
    desktopimage: {
        type: String
    },
    mobileimage: {
        type: String
    },
    gallery: [{
        image: {
            type: String,
            default: ""
        }
    }],
    testimonial: [{
        name: {
            type: String,
            default: ""
        },

        content: {
            type: String
        },

        order: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["true", "false"]
        }
    }]

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Products', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);