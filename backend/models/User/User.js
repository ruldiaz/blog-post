const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: {type: String, required: true},
   email: {type: String, required: false},
   password: {type: String, required: false},
   googleId: {type: String, required: false},
   authMethod: {type: String, enum: ["google", "local", "facebook", "github"], required: true, default: "local"},
},{
   timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;