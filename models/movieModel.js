const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    img:{
        type:String,
        required: true,
    },
    summary:{
        type:String,
        required: true
    }
},  {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Movies = mongoose.model("Movies", movieSchema);

module.exports = Movies;