const express = require('express')
const router = express.Router()
const db = require('../models')
const cryptoJS = require('crypto-js')
const bcrypt = require('bcryptjs')
const methodOverride = require('method-override')



// GET /users/new -- renders a form to create a new user
router.get('/signup', (req,res) => {
    res.render('users/new.ejs', {msg: null})
})

// POST /users -- creates a new user and redirect to index

router.post('/signup', async (req,res) => {
    try {
        // try to create the user
        // TODO: hash password
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)
        const [user, created] = await db.user.findOrCreate ({
            where: {email: req.body.email },
            defaults: {password: hashedPassword}
        })
        // if the user is new
        if (created) {
            // log them in by giving them cookie
            // res.cookie('cookie name', cookie data)
            // encrypt id
            const encryptedId = cryptoJS.AES.encrypt(user.id.toString(), process.env.ENC_KEY).toString()
            res.cookie('userId', encryptedId)
            // redirect to the homepage( in the future this could redict elsewhere like their profile)
            res.redirect('/users/profile')
        } else {
            // if the user was not created
                 // re render the login form with a message for the user
            console.log('that email already exist')
            res.render('users/new.ejs', {msg: 'Email exist in database already'})
        }
    } catch(err) {
        console.warn(err)
    }
})

// GET /users/login -- renders a login form
router.get('/login', async(req,res) => {
    res.render('users/login.ejs', {msg: null})
} )

// POST /users/login --authenticates user credentials against the database
router.post('/login', async (req, res) => {
    try {
        // look up the user in the db based on their email
        const foundUser = await db.user.findOne({
            where: {email: req.body.email }
        })
        const msg = 'Wrong username/password! Try Again!'
        // if the user is not found -- display the login form and give them a message
        if (!foundUser) {
            console.log('email not found on login')
            res.render('users/login.ejs', { msg })
            return // do not continue with the function
        }
        // otherwise, check the provided password against the password in the database
        // hash the password from the req.body and compare it to the db password
        const compare = bcrypt.compareSync(req.body.password, foundUser.password)
        if (compare) {
            // if they match -- send the user a cookie! to log them in
            const encryptedId = cryptoJS.AES.encrypt(foundUser.id.toString(), process.env.ENC_KEY).toString()
            res.cookie('userId', encryptedId)
            // TODO: redirect to profile
            res.redirect('/users/profile')
        } else {
            // if not -- render the log in form with a message
            res.render('users/login.ejs', {msg} )
        }
    } catch(err) {
        console.warn(err)
    }
})

// GET /users/logout -- clear the cookie to log the user out
router.get('/logout', (req,res) => {
    // clear the cookie from storage
    res.clearCookie('userId')
    // redirect to root
    res.redirect('/')
})

router.get('/profile', async (req,res) => {
    // check if user is authorized 
    try {
        
        const saveAnime = await db.anime.findAll({
            where: {
                userId: res.locals.user.dataValues.id
            }
        })
        
        if (!res.locals.user) {
            // if the user is not authorized, ask them to log in
            res.render('users/login.ejs', {msg: 'please log in to continue'})
            return // end the route here
        }
        res.render('users/profile', { user:res.locals.user, saveAnime })
    } catch(err) {
        console.warn(err)
    }
})
//  Try and catch to get the save button to work that'll redirect you to the profile page
router.post('/profile', async (req,res) => {
    // console.log(res.locals.user, "hello!")
    
    try {

        const [foundOrCreatedAnime, createdAnime] = await db.anime.findOrCreate({
            where: {
                userId: res.locals.user.dataValues.id,
                animeId: req.body.mal_id,  
            },
            defaults: {
                title: req.body.title
            }
        })
        const foundUser = await db.user.findByPk(res.locals.user.dataValues.id)
          foundUser.addAnime(foundOrCreatedAnime)
        // foundOrCreatedAnime.addUser(foundUser)
          res.redirect('/users/profile')

    } catch(err) {
        console.warn(err)
    }
})

//  a delete button for the save anime on the profile page
router.delete('/profile', async (req,res) => {
    try {
        const deletion = await db.anime.findOne({
            where: {
                id: req.body.id
            }
        })
        await deletion.destroy()
        res.redirect('/users/profile')
    } catch (err) {
        console.warn(err)
    }
})





module.exports = router

