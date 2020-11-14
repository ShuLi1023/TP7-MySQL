import { async } from 'regenerator-runtime'
import request from 'supertest'
import app from '../app'
import * as clinicDependency from '../weiClinic'

beforeEach(() => {
    clinicDependency.getClinic = jest.fn().mockReturnValue({
        create: jest.fn(),
        removeStackFromEnvelope: jest.fn(),
        assignStackToEnvelope: jest.fn(),
        killEnvelope: jest.fn(),
        destroy: jest.fn(),
        getData: jest.fn()
    })
})
const status = 204
const AGE = "47"
const GENDER = 'M'
const NAME = 'Elias Ryker'
const ResponseBody = [
    {
       id: 1,
       gender: GENDER,
       age: AGE,
       idStack: 1
   },
   {
       id: 1,
       realGender: GENDER,
       name: NAME,
       age: AGE,
       idEnvelope: 1
   }
]

describe('Async action', () => {
    test('GET digitize', async () => {
        const query = {
            gender: GENDER,
            age: AGE,
            name: NAME
        }
        
        const create = jest.fn().mockReturnValue(ResponseBody)

        clinicDependency.getClinic.mockReturnValue({
            create
        })

        const response = await request(app).get('/digitize').query(query)
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual(ResponseBody)
        expect(create).toHaveBeenCalledTimes(1)
        expect(create).toHaveBeenCalledWith(GENDER, NAME, AGE)
    })

    test('POST remove', async () => {

        const removeStackFromEnvelope = jest.fn().mockReturnValue(status)

        clinicDependency.getClinic.mockReturnValue({
            removeStackFromEnvelope
        })
        const response = await  request(app).post('/remove/42').end()

        expect(response.status).toBe(status)
        expect(removeStackFromEnvelope).toBeCalledTimes(1)
        expect(removeStackFromEnvelope).toHaveBeenCalledWith(42)
    })

    test('PUT implant', async () => {
        const assignStackToEnvelope = jest.fn().mockReturnValue(status)

        clinicDependency.getClinic.mockReturnValue({
            assignStackToEnvelope
        })

        const response = await request(app).put('/implant/7').end()

        expect(response.status).toBe(status)
        expect(assignStackToEnvelope).toBeCalledTimes(1)
        expect(assignStackToEnvelope).toHaveBeenCalledWith(7,NaN)
    })

    test('POST kill', async () => {

        const killEnvelope = jest.fn().mockReturnValue(status)

        clinicDependency.getClinic.mockReturnValue({
            killEnvelope
        })
        
        const response = await request(app).post('/kill/42').end()

        expect(response.status).toBe(status)
        expect(killEnvelope).toBeCalledTimes(1)
        expect(killEnvelope).toHaveBeenCalledWith(42)
    })

    test('DELETE truedeath', async() => {

        const destroy = jest.fn().mockReturnValue(status)

        clinicDependency.getClinic.mockReturnValue({
            destroy
        })
        const response = await request(app).delete('/truedeath/65').end()

        expect(response.status).toBe(status)
        expect(destroy).toBeCalledTimes(1)
        expect(destroy).toHaveBeenCalledWith(65)
    })

    test('GET find', async() => {
        const getData = jest.fn().mockReturnValue(ResponseBody)

        clinicDependency.getClinic.mockReturnValue({
            getData
        })

        const response = await request(app).get('/find/44')

        expect(response.status).toBe(200)
        expect(response.body).toEqual(ResponseBody)
        expect(getData).toBeCalledTimes(1)
        expect(getData).toHaveBeenCalledWith(44)
    })

    test('GET not find', async() => {
        const getData = jest.fn().mockReturnValue(false)

        clinicDependency.getClinic.mockReturnValue({
            getData
        })

        const response = await request(app).get('/find/44').end("Specified stack doesn't exist")

        expect(response.status).toBe(400)
        expect(getData).toBeCalledTimes(1)
        expect(getData).toHaveBeenCalledWith(44)
    })

})