const mongoose = require('mongoose')
const { Schema } = mongoose

const { omitPrivate } = require('./helpers')


const TreeSchema = new Schema({
  data: { type: String, required: true },
}, {
  collection: 'tree',
  toJSON: { transform: omitPrivate },
})


module.exports = mongoose.model('Tree', TreeSchema)
