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
const AGE = "47"
const GENDER = 'M'
const NAME = 'Elias Ryker'
describe('Async action', () => {
    it('GET digitize', async () => {
        const query = {
            gender: GENDER,
            age: AGE,
            name: NAME
        }

        const expectedResponseBody = [
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
        const create = jest.fn().mockReturnValue(expectedResponseBody)

        clinicDependency.getClinic.mockReturnValue({
            create
        })

        const response = await request(app).get('/digitize').query(query)
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expectedResponseBody)
        expect(create).toHaveBeenCalledTimes(1)
        expect(create).toHaveBeenCalledWith(GENDER, NAME, AGE)
    })

    test('POST remove', async () => {

        const removeStackFromEnvelope = jest.fn().mockReturnValue(204)

        clinicDependency.getClinic.mockReturnValue({
            removeStackFromEnvelope
        })
        const response = await  request(app).post('/remove/42').end()

        expect(response.status).toBe(204)
        expect(removeStackFromEnvelope).toBeCalledTimes(1)
        expect(removeStackFromEnvelope).toHaveBeenCalledWith(42)
    })

    test('PUT implant', async () => {
        const assignStackToEnvelope = jest.fn().mockReturnValue(204)

        clinicDependency.getClinic.mockReturnValue({
            assignStackToEnvelope
        })

        const response = await request(app).put('/implant/7').end()

        expect(response.status).toBe(204)
        expect(assignStackToEnvelope).toBeCalledTimes(1)
        expect(assignStackToEnvelope).toHaveBeenCalledWith(7,NaN)
    })

    test('POST kill', async () => {

        const killEnvelope = jest.fn().mockReturnValue(204)

        clinicDependency.getClinic.mockReturnValue({
            killEnvelope
        })
        
        const response = await request(app).post('/kill/42').end()

        expect(response.status).toBe(204)
        expect(killEnvelope).toBeCalledTimes(1)
        expect(killEnvelope).toHaveBeenCalledWith(42)
    })

    test('DELETE truedeath', async() => {

        const destroy = jest.fn().mockReturnValue(204)

        clinicDependency.getClinic.mockReturnValue({
            destroy
        })
        const response = await request(app).delete('/truedeath/65').end()

        expect(response.status).toBe(204)
        expect(destroy).toBeCalledTimes(1)
        expect(destroy).toHaveBeenCalledWith(65)
    })

    test('GET find', async() => {
        const getData = jest.fn().mockReturnValue(false)

        clinicDependency.getClinic.mockReturnValue({
            getData
        })

        const response = await request(app).get('/find/44').end()

        expect(response.status).toBe(400)
        expect(getData).toBeCalledTimes(1)
        expect(getData).toHaveBeenCalledWith(44)

    })

})