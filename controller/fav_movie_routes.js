const express = require('express')
const router = express.Router()
const FavMovie = require('../models/fav_movie')
const fetch = require('node-fetch')

//Post route that creates favorites page
router.post('/favorites', (req, res) => {

    req.body.owner = req.session.userId
    // console.log('req.body', req.body)
    // console.log("req.body.owner", req.body.owner)
    // console.log("req.body.userId", req.body.userId)
    // console.log("req.body.username", req.body.username)
    FavMovie.create(req.body)
        .then(newmovie => {
            // console.log("new movie created", newmovie)
            res.redirect('/')
        })
        .catch(err => {
            res.json(err)
        })
})

// DELETE - Deletes movies from favorite page
router.delete('/:id', (req, res) => {
    const favmovieId = req.params.id

    FavMovie.findByIdAndRemove(favmovieId)
        .then(favmovie => {
            res.redirect('/favmovies')
        })
        .catch(err => {
            res.json(err)
        })
})

//index route(shows all search results from API)
router.post('/search_results', async (req, res) => {
    try {
        let movie = await fetch(`https://www.omdbapi.com/?apikey=632b0bdc&s=${req.body.title}`)
        let data = await movie.json()
        let searchResults = data.Search
        // console.log(data.Search)
        res.render('favmovies/search_results', { searchResults })
    }
    catch {
        console.log('test')
    }
})

//index route for favorite movies
router.get('/mine', (req, res) => {
    req.body.owner = req.session.userId
    const username = req.session.username
    const comments = req.session.comments
    // { owner: req.session.userId }
    FavMovie.find({ owner: req.session.userId })
        .then(favmovies => {
            // console.log('index of favmovies', favmovies)
            res.render('favmovies/showfavmovies', { favmovies, username, comments })
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})

//Show Route for one clicked fav movie
router.get('/:id', (req, res) => {
    const favmovieId = req.params.id
    console.log("favmovieId", favmovieId)
    FavMovie.findById(favmovieId)
        .populate('comments.author')
        .then(favmovie => {
            const userId = req.session.userId
            const username = req.session.username
            const comments = req.session.username
            console.log("favmovie", favmovie)
            res.render('favmovies/show_one_fav_movie', { favmovie, userId, username})
        })
        .catch(err => {
            res.json(err)
        })
})


//PUT Route, adds to favorite page
router.put('/favorites/:id', (req, res) => {
    const imdbId = req.params.id
    // console.log('req.body', req.body)
    // console.log(imdbId)

    req.body.owner = req.session.userId

    FavMovie.findByIdAndUpdate(imdbId, req.body, { new: true })
        .then(favmovie => {
            res.redirect('/favmovies/showfavmovies')
        })
        .catch(err => {
            res.json(err)
        })
})

//Get Route for homepage
router.get('/', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const search = req.session.search
    res.render('favmovies/homepage', { username, loggedIn, search })
})


module.exports = router