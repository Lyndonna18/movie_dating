///////////////////////////////////////
// This file runs on `npm run seed`
///////////////////////////////////////

///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Movie = require('./movie')
const fetch = require('node-fetch')
const { application } = require('express')

///////////////////////////////////////
// Seed Code
///////////////////////////////////////
// save my db connection to a variable for easy reference later
const db = mongoose.connection

// this runs the callback function when the db connection is opened from this file
db.on('open', () => {
    // array of starter fruits
    // const startMovies = [
    //     { name: "Orange", color: "orange", readyToEat: false },
    //     { name: "Grape", color: "purple", readyToEat: false },
    //     { name: "Banana", color: "orange", readyToEat: false },
    //     { name: "Strawberry", color: "red", readyToEat: true },
    //     { name: "Coconut", color: "brown", readyToEat: true }
    // ]

    fetch('https://www.omdbapi.com/?apikey=632b0bdc&s=jaws')
        .then(res => res.json())
        .then(data => {
            // when we seed data, we usually clear out the db first
            Movie.remove({})
                // then we create that data
                .then(deletedMovies => {
                    console.log('this is what remove returns', deletedMovies)
                    const ApiInfo = data.Search
                    // now that our delete was successful, we can create our fruits
                    Movie.create(ApiInfo)
                        .then(data => {
                            console.log('the new movies', data)
                            db.close()
                        })
                        .catch(error => {
                            console.log('error:', error)
                            db.close()
                        })
                })
                .catch(error => {
                    console.log('error:', error)
                    db.close()
                })
        })
    // whether it's successful or not, we want to close our db connection
})