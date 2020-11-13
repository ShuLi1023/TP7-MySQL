import express from 'express'
import bodyParser from 'body-parser'
import {getClinic} from './weiClinic'
//import TypeOrmDal from './typeOrmDal'

const app = express()

app.use(bodyParser.json())
app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/digitize', async (req, res) => {

    const { gender, name, age } = req.query
    const createdElements = await getClinic().create(gender, name, age)

    res.status(200).set( 'Content-Type', 'application/json').json(createdElements)
})


app.post('/remove/:stackId', async (req, res) => {
    const stackId = parseInt(req.params.stackId)

    const status = await getClinic().removeStackFromEnvelope(stackId)

    res.status(status).end()

})

app.put('/implant/:stackId/:envelopeId?', async (req, res) => {

    const stackId = parseInt(req.params.stackId)
    const envelopeId = parseInt(req.params.envelopeId)

    const status = await getClinic().assignStackToEnvelope(stackId,envelopeId)

    res.status(status).end()
    })

app.post('/kill/:envelopeId', async (req, res) => {
    const envelopeId = parseInt(req.params.envelopeId)

    const status = await getClinic().killEnvelope(envelopeId)

    res.status(status).end()

})

app.delete('/truedeath/:stackId', async (req, res) => {

    const stackId = parseInt(req.params.stackId)

    const status = await getClinic().destroy(stackId)

    res.status(status).end()
})


app.get('/find/:stackId', async (req, res) => {
    const stackId = parseInt(req.params.stackId)

    const data = await getClinic().getData(stackId)
    if(data != false){
        res.status(200).set( 'Content-Type', 'application/json').json(data)
    }else{
        res.status(400).end("Specified stack doesn't exist")
    }

})

export default app
