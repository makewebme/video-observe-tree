const path = require('path')
const express = require('express')

const router = express.Router()


router.get('/*', (req, res) => {
  return res.sendFile(path.resolve(`../build/static/${req.url}`))
})


module.exports = router
