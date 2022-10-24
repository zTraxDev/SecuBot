const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    ChannelID: {type: Number, required: true, default: null},
    guildId: { type: String, required: true }
})

module.exports = mongoose.model("setLogs", Schema)