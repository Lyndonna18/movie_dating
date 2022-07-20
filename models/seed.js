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

const db = mongoose.connection

db.on('open', () => {
    
    const search=input.value
    fetch(`https://www.omdbapi.com/?apikey=632b0bdc&s=${search}`)
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
                            console.log(ApiInfo[0])
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
 
})