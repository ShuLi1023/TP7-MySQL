import express from 'express'
import bodyParser from 'body-parser'
import TypeOrmDal from './typeOrmDal'

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
    //const weiclinic = new TypeOrmWeiClinic()
    //const createdElements = await weiclinic.create(gender, name, age)

    const weiclinic = new TypeOrmDal()
    const createdElements = await weiclinic.create(gender, name, age)

    res.status(200).set( 'Content-Type', 'application/json').json(createdElements)
})

app.get('/find/:stackId', async (req, res) => {
    const stackId = parseInt(req.params.stackId)

    const weiClinic = new TypeOrmDal()

    const data = await weiClinic.getData(stackId)

    res.status(200).set( 'Content-Type', 'application/json').json(data)

})

app.post('/remove/:stackId', async (req, res) => {
    const stackId = parseInt(req.params.stackId)

    const weiClinic = new TypeOrmDal()
    const status = await weiClinic.removeStackFromEnvelope(stackId)

    res.status(status).end()

})

app.put('/implant/:stackId/:envelopeId?', async (req, res) => {

    const stackId = parseInt(req.params.stackId)
    const envelopeId = parseInt(req.params.envelopeId)
    const weiClinic = new TypeOrmDal()
    const status = await weiClinic.assignStackToEnvelope(stackId,envelopeId)

    res.status(status).end()
    })

app.post('/kill/:envelopeId', async (req, res) => {
    const envelopeId = parseInt(req.params.envelopeId)

    const weiClinic = new TypeOrmDal()
    const status = await weiClinic.killEnvelope(envelopeId)

    res.status(status).end()

})

app.delete('/truedeath/:stackId', async (req, res) => {

    const stackId = parseInt(req.params.stackId)
    const dal = new TypeOrmDal()
    const status = await dal.destroyStack(stackId)

    res.status(status).end()
    
})

export default app
