const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const bcryptSalt = 10


router.post('/signup', async (req, res) => {
    const { username, password } = req.body
  
    if (!username || !password) {
      res.status(400).json({ message: 'Please provide both credentials' })
      return
    }
  
    try {
      const userFound = await User.findOne({ username })
      if (userFound) {
        res.status(400).json({ message: 'This username already exists' })
        return
      }
  
      // encrypt the password
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(password, salt)
  
      const user = await User.create({ username: username, password: hashPass })
  
      req.session.user = user
      res.status(200).json(user)
      return
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    }
  })

  router.post('/login', async (req, res) => {
    const { username, password } = req.body
  
    console.log(req.body)
    if (!username || !password) {
      res.status(400).json({ message: 'Please provide both credentials' })
      return
    }
  
    try {
      const user = await User.findOne({ username })
  
      if (user) {
        const passwordCorrect = await bcrypt.compare(password, user.password)
        if (passwordCorrect) {
          req.session.user = user
          res.status(200).json(user)
        }
      } else {
        res
          .status(400)
          .json({ message: 'Please provide the right credentials ' })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    }
  })
  
  router.get('/logout', (req, res) => {
    req.session.destroy()
    res.status(200).json({ message: 'User is logged out' })
  })
  
  router.get('/loggedin', (req, res) => {
    if (req.session.user) {
      res.status(200).json(req.session.user)
    } else {
      res.status(400).json({ message: 'No user in session' })
    }
  })

  
module.exports = router