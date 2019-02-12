const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const listRouter = require('./controllers/list')

mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

app.use('/api/lists', listRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}

/*const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const List = require('./models/list')


app.use(cors())
  
  app.get('/api', (req, res) => {
    res.send('')
  })
  
  const formatList = (list) => {
    return {
      name: list.name,
      date: list.date,
      listed: list.listed,
      id: list._id,
      items: list.items
    }
  }
  
  app.get('/api/lists', (request, response) => {
    List
      .find({})
      .then(lists => {
        response.json(lists.map(formatList))
      })
  })
  
  app.get('/api/lists/:id', (request, response) => {
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

  app.delete('/api/lists/:id', (request, response) => {
    List
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })
  })

  app.post('/api/lists', (request, response) => {
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
    })

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
  

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })*/
