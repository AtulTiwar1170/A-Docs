const { Schema, model } = require('mongoose');

const Document = new Schema({
    _id: {
        type: String,
        unique: true,
    },
    data: {
        type: Object,
        required: true,
    }
});

module.exports = model("Document", Document);