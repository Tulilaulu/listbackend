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
 /*     items: list.items.map(this.itemFormat(list.items))
    }
  }

itemSchema.statics.itemFormat = (item) => {
    return {
      name: item.name,
      quantity: item.quantity,
      notes: item.notes,
      id: list.id,
      editing: false //for frontend, not saved ever
    }
  }
*/
const List = mongoose.model('List', listSchema);

module.exports = List