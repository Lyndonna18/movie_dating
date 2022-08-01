const mongoose = require('mongoose')
const commentSchema = require('./comment')

const { Schema, model } = mongoose

const FavmovieSchema = new Schema({
    title: String,
    year: String,
    imdbId: String,
    posterImg: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    comments: [commentSchema]
},
    {
        timestamps: true
    })

//the collection for all of the Tweet will be lowercase and plural 'tweets'
const FavMovie = model('FavMovie', FavmovieSchema)

module.exports = FavMovie