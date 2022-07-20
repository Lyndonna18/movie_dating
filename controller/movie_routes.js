const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')
const fetch = require('node-fetch')

// DELETE - Delete
router.delete('/:id', (req, res) => {
    const movieId = req.params.id

    Movie.findByIdAndRemove(movieId)
        .then(movie => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET route for displaying an update form
router.get('/:id/edit', (req, res) => {
    const movieId = req.params.id

    Movie.findById(movieId)
        .then(movie => {
            res.render('movies/edit', { movie })
        })
        .catch(err => {
            res.json(err)
        })
})

router.post('/search_results', async (req, res) => {
    try {
        let movie = await fetch(`https://www.omdbapi.com/?apikey=632b0bdc&s=${req.body.title}`)
        let data = await movie.json()
        let searchResults = data.Search
        console.log(data.Search)
        res.render('movies/search_results', {searchResults})
    }
    catch {
        console.log('test')
    }
})


// PUT - Update
//localhost:3000/fruits/:id
// router.put('/:id', (req, res) => {
//     const movieId = req.params.id

//     req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

//     movie.findByIdAndUpdate(movieId, req.body, { new: true })
//         .then(movie => {
//             res.redirect(`/movies/${movie._id}`)
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })

// GET route for displaying my form for create
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    res.render('movies/new', { username, loggedIn })
})

// // POST - Create
// router.post('/', (req, res) => {
//     req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
//     req.body.owner = req.session.userId

//     Movie.create(req.body)
//         .then(movie => {
//             console.log(movie)
//             // res.json(fruit)
//             res.redirect('/movies')
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })

// GET - Index
// localhost:3000/fruits
router.get('/', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const search = req.session.search
    res.render('movies/homepage', { username, loggedIn, search })
    // // mongoose to find all fruits
    // Movie.find({})
    //     // return fruits as json
    //     .then(movies => {
    //         // res.json(fruit)
    //         res.render('movies/index', { movies })
    //     })
    //     .catch(err => {
    //         res.json(err)
    //     })
})

router.get('/mine', (req, res) => {
    const username = req.session.username
    // find the fruits associated with the logged in user
    Movie.find({ owner: req.session.userId })
        .then(movies => {
            res.render('movies/index', { movies, username })
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})



// GET - Show
// localhost:3000/fruits/:id <- change with the id being passed in
router.get('/:id', (req, res) => {
    const movieId = req.params.id

    Movie.findById(movieId)
        
        .populate('comments.author')
        // send back some json
        .then(movie => {
            // res.json(fruit)
            const userId = req.session.userId
            const username = req.session.username
            res.render('movies/show', { movie, userId, username })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router