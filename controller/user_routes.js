///////////////////////////////////////
// Import dependencies
///////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

///////////////////////////////////////
// Create a router
///////////////////////////////////////
const router = express.Router()

///////////////////////////////////////
// list out our routes
///////////////////////////////////////

router.get('/signup', (req, res) => {
    const username = req.session.username
    res.render('users/signup', { username })
})

router.post('/signup', async (req, res) => {
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    User.create(req.body)
        .then(user => {
            console.log('this is the new user', user)
            res.redirect('/users/login')
        })
        .catch(error => {
            console.log(error)
            res.json(error)
        })
})

router.get('/login', (req, res) => {
    const username = req.session.username
    res.render('users/login', { username })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    console.log('this is the session', req.session)
    User.findOne({ username })
        .then(async (user) => {
            if (user) {
                const result = await bcrypt.compare(password, user.password)
                if (result) {
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user._id
                    // console.log('this is the session after login', req.session)
                    // console.log('this is the USERiD after login', req.session.userId)
                    res.redirect('/favmovies')
                } else {
                    res.json({ error: 'username or password incorrect' })
                }
            } else {

                res.json({ error: 'user does not exist' })
            }
        })

        .catch(error => {
            console.log(error)
            res.json(error)
        })
})

router.get('/logout', (req, res) => {
    req.session.destroy(ret => {
        console.log('this is returned from req.session.destroy', ret)
        console.log('session has been destroyed')
        console.log(req.session)
        res.redirect('/favmovies')
    })
})

///////////////////////////////////////
// export our router
///////////////////////////////////////
module.exports = router