const mongoose = require('mongoose');


const InstitutionSchema = new mongoose.Schema({

    institutionName: {
        type: String,
        required: true,
    },

});
module.exports = mongoose.model("institutions", InstitutionSchema);