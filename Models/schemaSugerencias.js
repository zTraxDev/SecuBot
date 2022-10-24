const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    Guild: String,
    Canal: String
})

module.exports = mongoose.model("sug", Schema)