const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
    {
        sender:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "TalksUp-Users",
            required: true,
        },

        content:{
            type: String,
            trim: true
        },

        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TalksUp-ChatModel"
        },
    },

    {
        timestamps: true
    }
)

const Message = mongoose.model("TalksUp-Message", messageModel);
module.exports = Message;