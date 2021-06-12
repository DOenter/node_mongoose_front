//sposoby 1

const mongoose = require("mongoose");

const Character = mongoose.model("Character", mongoose.Schema({
    name:String,
    age:Number,
    rank:String
}));

module.exports = Character;