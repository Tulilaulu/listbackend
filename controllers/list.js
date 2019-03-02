const express = require('express')
const app = express()

const listRouter = require('express').Router()
const List = require('../models/list')

  
  listRouter.get('', (request, response) => {
    List
      .find({})
      .then(lists => {
        response.json(lists.map(List.format).filter(list => list.listed))
      })
  })

  listRouter.get('/:name', (request, response) => {
    List
    .findOne({name: request.params.name})
    .then(list => {
        if (list) {
            response.json(List.format(list))
        } else {
            response.status(404).json(null).end()
        }
    })
    .catch(error => {
        console.log(error)
        response.status(404).end()
      })
  }) 

  listRouter.delete('/:id', (request, response) => {
    List
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })
  })

  listRouter.post('', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({error: 'name missing'})
    }

    const list = new List({
        name: body.name,
        listed: body.listed|| true,
        date: new Date(),
        items: body.items
    })
    
    list
    .save()
    .then(List.format)
    .then(savedAndFormattedList => {
      response.json(savedAndFormattedList)
    })
    /*.then(saved => {
      response.json(List.format(saved))
    })*/
  })
  
  listRouter.put('/:id', (request, response) => {
    const body = request.body
    console.log(body)
    const list = {
        name: body.name,
        listed: body.listed,
        items: body.items
    }

    List
      .findByIdAndUpdate(request.params.id, list, { new: true } )
      .then(updated => {
        response.json(List.format(updated))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
  })

  listRouter.put('/items/:id', (request, response) => {
    const body = request.body
    console.log(body)
    const newItem = {
        name: body.name,
        notes: body.notes,
        quantity: body.quantity
    }
    List
      .findByIdAndUpdate(request.params.id, {$push: {items: newItem}}, { new: true })
      .then(updated => {
        console.log(updated)
        response.json(List.format(updated))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
  })

  listRouter.delete('/items/:listid/:itemid', (request, response) => {
    const body = request.body
    console.log(body, request.params)
    List
      .findByIdAndUpdate(request.params.listid, {$pull: {items: {_id: request.params.itemid}}}, { new: true })
      .then(updated => {
        console.log(updated)
        response.json(List.format(updated))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
  })

  listRouter.put('/items/:listid/:itemid', (request, response) => {
    const body = request.body
    console.log("update item method", body, request.params)
    List.findOneAndUpdate({ "_id" : request.params.listid, "items._id": request.params.itemid }, 
      { "items.$": body })
      .then(updated => {
        response.json(List.format(updated))
      })
      .catch(error => {
        console.log("error:", error)
        response.status(400).send({ error: 'malformatted id' })
      })
  })

module.exports = listRouter