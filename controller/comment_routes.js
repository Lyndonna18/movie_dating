const express = require('express')
const router = express.Router()
const FavMovie = require('../models/fav_movie')

//Post create route for comment creation
router.post('/:favmovieId', (req, res) => {
    console.log(res.data)
    const favmovieId = req.params.favmovieId
    console.log('req.params.favmovieId', req.params.favmovieId )
    req.body.author = req.body.userId
    FavMovie.findById(favmovieId)
        .then(favmovie => {
            console.log(favmovie)
            console.log(favmovie.comments)
            favmovie.comments.push(req.body)
            return favmovie.save()
        })
        .then(favmovie => {
            res.redirect(`/favmovies/${favmovie._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})

//DELETE route for deleting comments

router.delete('/delete/:favmovieId/:commId', (req, res) => {
    const favmovieId = req.params.favmovieId
    const commId = req.params.commId

    FavMovie.findById(favmovieId)
        .then(favmovie => {
            const comment = favmovie.comments.id(commId)
            //remove comment
            comment.remove()
            //I've changed the comments field by 1
            return favmovie.save()
        })
        .then(favmovie => {
            res.redirect(`/favmovies/${favmovieId}`)
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router