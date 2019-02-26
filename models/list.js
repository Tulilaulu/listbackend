const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: String, 
    quantity: String, 
    notes: String 
})

const Item = mongoose.model('Item', itemSchema);

const listSchema = new mongoose.Schema({
    name: String,
    date: Date,
    listed: Boolean,
    items: [ itemSchema ]
})

  
listSchema.statics.format = (list) => {
    return {
      name: list.name,
      date: list.date,
      listed: list.listed,
      id: list._id,
      items: list.items
    }
  }

const List = mongoose.model('List', listSchema);

module.exports = List