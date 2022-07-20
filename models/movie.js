const mongoose = require('mongoose')
const commentSchema = require('./comment')

const { Schema, model } = mongoose

const movieSchema = new Schema({
    title: String,
    year: String,
    omdbId: String,
    posterImg: String,
    favorited: Boolean,    
}, {
    comments: [commentSchema]
},
    {
    timestamps: true    
})

//the collection for all of the Tweet will be lowercase and plural 'tweets'
const Movie = model('Movie', movieSchema)

module.exports = Movie