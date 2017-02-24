var schema = new Schema({
    pselect: {
        type: String,
        enum: ["Flexible", "Rigid"]
    },
   content: {
        type: String,
        default: ""
    },
    image: {
        type: String
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('SpecialityFilms', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);