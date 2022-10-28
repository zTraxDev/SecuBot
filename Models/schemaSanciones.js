const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    Guild: String,
    User: String,
    Canal: String,
    Sancion: Array,
})

module.exports = mongoose.model("sancion", Schema)