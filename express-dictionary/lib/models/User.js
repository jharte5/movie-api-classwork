const mongoose = require('mongoose');

// create blueprint for inputs into database
// word will have type string, must be unique, have default, convert to lowercase
// definition will be type string, to lowercase, and have a default
const MovieSchema = new mongoose.Schema({
    title: { type: String, unique: true, trim: true },
    rating: { type: String, trim: true},
    synopsis: {type : String},
    releaseYear: { type: String},
    genre: {type: String},
    director: {type: String},
    boxoffice: {type: String, default:''}

    // definition: { type: String, default: '', lowercase: true, trim: true }
});

module.exports = mongoose.model('words', MovieSchema);