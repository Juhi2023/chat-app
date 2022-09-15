const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
    {
        chatName:{
            type: String,
            trim: true,
        },

        isGroupChat:{
            type: Boolean,
            default: false
        },

        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "TalksUp-Users"
            }
        ],

        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TalksUp-Message"
        },

        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TalksUp-Users"
        },
    },

    {
        timestamps: true
    }
)

const Chat = mongoose.model("TalksUp-ChatModel", chatModel);
module.exports = Chat