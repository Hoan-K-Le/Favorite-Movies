const express = require('express')
const router = express.Router()
const db = require('../models')
const cryptoJS = require('crypto-js')
const bcrypt = require('bcryptjs')
const axios = require('axios')

router.get('/', async (req,res) => {
  setTimeout(async () => {

    try {
      const searchURL = `https://api.jikan.moe/v4/anime?q=${req.query.animeSearch}`
      
     const response = await axios.get(searchURL)
     const anime = response.data.data
     // destructoring array into variables
    //  const [a] = anime 
    
    res.render('results.ejs', {anime})
      
    } catch(err) {
      console.warn(err)
    }
    
  }, 600)
  })
  
  // POST /anime -- Create new saved
  // router.post('/', async (req, res) => {
  //   await db.userAnime.create({
  //     title: req.body.title,
  //     mal_id: req.body.mal_id
  //   })
  //   res.redirect('/users/profile')
  // })
  
  
  router.get('/:id', async (req,res) => {
    try {
      const animeComment = await db.comment.findAll({
        where: {animeId: req.params.id},
        include: [db.user]
      })

      // console.log(animeComment[0].dataValues.user.id)
      
      // console.log(req.params.id)
      const idURL = `https://api.jikan.moe/v4/anime/${req.params.id}`
      // const idURL = `https://api.jikan.moe/v4/anime?i=${req.params.id}`
      const response = await axios.get(idURL)
      const anime = response.data.data
      // console.log(anime)
      // const animeDetails = Object.entries()
      // console.log(idURL)
      res.render('details.ejs', {user:res.locals.user, anime, animeComment})
      // res.send('hi')
    } catch(err) {
      console.warn(err)
    }
  })


  router.post('/:id', async (req,res) => {

    try {
      const animeCom = await db.comment.create({
        comment: req.body.comment,
        animeId: req.params.id,
        userId: res.locals.user.dataValues.id
      })
        
      // console.log(animeCom)
        res.redirect(`/anime/${req.params.id}`)
    } catch(err) {
      console.warn(err)
    }
  })

  router.delete('/:id', async (req,res) => {
    try {
      const commentDelete = await db.comment.findOne({    
        where: {
          userId: res.locals.user.dataValues.id,
          animeId: req.params.id
        }
      })
      await commentDelete.destroy()
      res.redirect(`/anime/${req.params.id}`)
    } catch(err) {
      console.warn(err)
    }
  })
 
  // update the comments with PUT

  router.get('/edit/:id', async (req, res) => {
    try {
      if (!res.locals.user) {
        res.render('users/login', {msg: 'please log in to continue'})
        return
      }
      const editComment = await db.comment.findOne ({
        where: {
          userId: res.locals.user.dataValues.id,
          animeId: req.params.id
        }
      })
      // console.log(editComment)
      res.render('users/edit', {editComment} )
    

    } catch(err) {
      console.warn(err)
    }
  })

  router.put('/edit', async (req, res) => {
    if (!res.locals.user) {
      res.render('users/login', {msg: 'please log in to continue'})
      return 
    }
    try {
      // console.log(req.body)
      const findComment = await db.comment.findOne({
        
        where: {
          // animeId: req.body.id,
          userId: res.locals.user.dataValues.id
         
        }
      
      })
      await findComment.set({comment: req.body.comment})
      await findComment.save()
      res.redirect(`/anime/${findComment.animeId}`)
    }catch(err) {
      console.warn(err)
    }
  })


  module.exports = router