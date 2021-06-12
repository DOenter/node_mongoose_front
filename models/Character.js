//sposoby 1

// const mongoose = require("mongoose");
// const Character = mongoose.model("Character", mongoose.Schema({
//     name:String,
//     age:Number,
//     rank:String
// }));
// module.exports = Character;

//sposób 2

const mongoose = require("mongoose")

const CharacterSchema = new mongoose.Schema({
    name:String,
    age:Number,
    rank:String,
    employment:Boolean
});

const Character = new mongoose.model("characters",CharacterSchema)

module.exports = Character