/////////////////////////////////
// import dependencies
/////////////////////////////////
// require('dotenv').config()
const express = require('express')
// const morgan = require('morgan')
// const methodOverride = require('method-override')
// const movieRoutes = require('./controller/movie_routes')
// const userRoutes = require('./controller/user_routes')
// const commentRoutes = require('./controller/comment_routes')

// ////////////////////////////////////////////
// // Create our express application object
// ////////////////////////////////////////////
// const app = require('liquid-express-views')(express())

////////////////////////////////////////////
// Middleware
////////////////////////////////////////////const express = require('express')
// making a router
const router = express.Router()
// importing Fruit model to access database
const Movie = require('../models/movie')

//Need a POST route for Creation
//localhost:00/comments/:fruitId <-- A single Fruit can have many comments
router.post('/:movieId', (req, res) => {
    const movieId = req.params.movieId
    req.body.author = req.body.userId

    Movie.findById(movieId)
        //after we found that fruit
        //we want to take that fruit and add the comment
        .then(movie => {
            //single fruit doc there is a field called comments and I can access it with my dot notation
            movie.comments.push(req.body)
            //if we change a doc, we have to return and call .save() on the doc
            return movie.save()
        })
        .then(movie => {
            res.redirect(`/movies/${movie._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})

//Need a DELETE route for deleting
//localhost:3000/comments/delete/:fruitId/:commId
router.delete('/delete/:movieId/:commId', (req, res) => {
    const movieId = req.params.movieId
    const commId = req.params.commId

    //find a fruit by it's ID
    Movie.findById(movieId) //single fruit doc inside a fruit doc will have many comments
        //find this comment by it's ID
        .then(movie => {
            const comment = movie.comments.id(commId)
            //remove comment
            comment.remove()
            //I've changed the comments field by 1
            return movie.save()
        })
        .then(movie => {
            res.redirect(`/movies/${movieId}`)
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router