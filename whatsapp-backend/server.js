//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import Cors from 'cors'

//app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: '1075500',
    key: '87648c33c59bf2d3bc4d',
    secret: '7ee68acb5001736c01dc',
    cluster: 'eu',
    encrypted: true
})

//middleware
app.use(express.json())
app.use(Cors())

//DB confing
const connection_url = 'mongodb+srv://admin:TilzZyyM5YFAG6M0@cluster0.bthoa.mongodb.net/whatsappdb?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open',() => {
    console.log('DB connected')

    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument
            pusher.trigger('messages','inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        } else {
            console.log('Error triggering Pusher')
        }
    })
})

//api routes
app.get('/',(req,res)=>res.status(200).send('hello world'))

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req,res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err,data)=> {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})

//listen
app.listen(port,()=>console.log(`Listening on localhost:${port}`));