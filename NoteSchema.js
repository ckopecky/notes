


const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

const noteDefinition = {
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: ObjectId,
        required: true,
    },

};

const noteOptions = {
    timestamps: true,
}

const noteSchema = new mongoose.Schema(noteDefinition, noteOptions);
const noteModel = mongoose.model("Note", noteSchema, "notes");
module.exports = noteModel;
