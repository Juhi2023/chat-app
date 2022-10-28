const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel")
const Chat =require('../models/chatModel')

//@description     send message
//@route           POST /api/message
//@access          Private
const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
  
    if(!content || !chatId){
        console.log("Invalid data")
        return res.status(400)
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try{
        var message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email"
        })

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        })

        res.json(message);
    }catch(err){
        res.status(401);
      throw new Error(err.message);
    }

  });

  
//@description     get all messages
//@route           GET /api/message/:chatId
//@access          Private
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({chat: req.params.chatId})
    .populate("sender", "name pic email")
    .populate("chat")

    res.json(messages);
  } catch (err) {
        res.status(401);
      throw new Error(err.message);
  }
});

  
  module.exports = { sendMessage, allMessages};
  