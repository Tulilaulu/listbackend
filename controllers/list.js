const express = require('express')
const app = express()

const listRouter = require('express').Router()
const List = require('../models/list')
  
  const formatList = (list) => {
    return {
      name: list.name,
      date: list.date,
      listed: list.listed,
      id: list._id,
      items: list.items
    }
  }
  
  listRouter.get('', (request, response) => {
    List
      .find({})
      .then(lists => {
        response.json(lists.map(formatList))
      })
  })
  
  listRouter.get('/:id', (request, response) => {
    List
    .findById(request.params.id)
    .then(list => {
        if (list) {
            response.json(formatList(list))
        } else {
            response.status(404).end()
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

    if (body.name === undefined && body.items === undefined) {
        return response.status(400).json({error: 'name or items missing'})
    }

    const list = new List({
        name: body.name,
        listed: body.listed|| true,
        date: new Date(),
        items: body.items
    })
    
    list
    .save()
    .then(formatList)
    .then(savedAndFormattedList => {
      response.json(savedAndFormattedList)
    })
    /*.then(saved => {
      response.json(formatList(saved))
    })*/

  })
  
  app.put('/api/notes/:id', (request, response) => {
    const body = request.body
  
    const list = {
        name: body.name,
        listed: body.listed,
        items: body.items
    }
  
    List
      .findByIdAndUpdate(request.params.id, list, { new: true } )
      .then(updated => {
        response.json(formatList(updated))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
  })

module.exports = listRouter