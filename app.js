import express from 'express'
import bodyParser from 'body-parser'

import {getClinic} from './weiClinic'

const app = express()

app.use(bodyParser.json())
app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/digitize', (req, res) => {

    const gender = req.query.gender
    const name = req.query.name
    const age = req.query.age

    const createdElements = getClinic().create(gender, name, age)

    res.status(200).set({ 'Content-Type': 'application/json' }).json(createdElements)
})

app.post('/remove/:stackId', (req, res) => {
    const stackId = parseInt(req.params.stackId)

    const removed = getClinic().removeStackFromEnvelope(stackId)

    if(removed){
        res.status(204).end()
    }else{
        res.status(400).end()
    }
    
})

app.put('/implant/:stackId/:envelopeId?', (req, res) => {

    const stackId = parseInt(req.params.stackId)
    const envelopeId = parseInt(req.params.envelopeId)

    const result = getClinic().assignStackToEnvelope(stackId,envelopeId)

    switch (result) {
        case '1':
            res.status(204).end()
            break;
        case '2':
            res.status(400).end()
            break;
            
        default:
            res.status(404).end()
            break;
    }
    
})

app.post('/kill/:envelopeId', (req, res) => {
    const envelopeId = parseInt(req.params.envelopeId)

    const killed = getClinic().killEnvelope(envelopeId)

    if(killed){   
        res.status(204).end()
    }else{
        res.status(400).end()
    }
})

app.delete('/truedeath/:stackId',(req, res) => {

    const stackId = parseInt(req.params.stackId)
    const result = getClinic().destroyStack(stackId)

    if(result){
        res.status(204).end()
    }
    else{
        res.status(400).end()
    }
})

export default app
