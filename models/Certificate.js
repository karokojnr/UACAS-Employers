const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CertificateSchema = new mongoose.Schema({
    certificateNumber: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    otherNames: {
        type: String,
        required: true,
    },
    institution: {
        type: Schema.Types.ObjectId,
        ref: 'institutions'
    },
    regNumber: {
        type: String,
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { usePushEach: true });
module.exports = mongoose.model("Certificate", CertificateSchema);