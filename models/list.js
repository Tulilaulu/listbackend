const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: String, 
    quantity: Number, 
    notes: String 
})

const Item = mongoose.model('Item', itemSchema);

const listSchema = new mongoose.Schema({
    name: String,
    date: Date,
    listed: Boolean,
    items: [ itemSchema ]
})

const List = mongoose.model('List', listSchema);

module.exports = List