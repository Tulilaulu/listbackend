const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

let lists = [
    {
      id: 1,
      name: 'Lista',
      date: '2017-12-10T17:30:31.098Z',
      listed: true,
      items: [
          {id: 1, name: "Banaani", quantity: 2, notes: "ruskea"},
          {id: 2, name: "Banaani", quantity: 1, notes: "vihreä"}
      ]
    },
    {
        id: 2,
        name: 'Lista2',
        date: '2017-12-10T17:30:31.098Z',
        listed: true,
        items: [
            {id: 1, name: "Banaani", quantity: 2, notes: "ruskea"},
            {id: 2, name: "Banaani", quantity: 1, notes: "vihreä"}
        ]
      },
      {
        id: 3,
        name: 'Lista3',
        date: '2017-12-10T17:30:31.098Z',
        listed: true,
        items: [
            {id: 1, name: "Banaani", quantity: 2, notes: "ruskea"},
            {id: 2, name: "Banaani", quantity: 1, notes: "vihreä"}
        ]
      }
  ]
  
  app.get('/api', (req, res) => {
    res.send('')
  })
  
  app.get('/api/lists', (req, res) => {
    res.json(lists.filter(list=> list.listed))
  })
  
  app.get('/api/lists/:id', (request, response) => {
    const id = Number(request.params.id)
    const list = lists.find(list => list.id === id)
    if ( list ) {
        response.json(list)
      } else {
        response.status(404).end()
      }
  }) 

  app.delete('/api/lists/:id', (request, response) => {
    const id = Number(request.params.id)
    lists = lists.filter(list => list.id !== id)
  
    response.status(204).end()
  })
  
  const generateId = () => {
    const maxId = notes.length > 0 ? notes.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1
    return maxId + 1
  }

  app.post('/api/lists', (request, response) => {
    const body = request.body

    if (body.name === undefined && body.items === undefined) {
        return response.status(400).json({error: 'name or items missing'})
    }

    const list = {
        name: body.name,
        listed: body.listed|| true,
        date: new Date(),
        id: generateId(),
        items: body.items
    }
    lists = lists.concat(list)
  
    response.json(list)
  })
  

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
