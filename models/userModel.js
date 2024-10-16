const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersModel = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },

        email:{
            type: String,
            trim: true,
            unique:true
        },

        password: {
            type: String,
            required: true,
        },

        pic: {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
    },

    {
        timestamps: true
    }
)

usersModel.pre('save', async function (next){
    if(!this.isModified){
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

usersModel.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const Users = mongoose.model("TalksUp-Users", usersModel);
module.exports = Users;