import { async } from 'regenerator-runtime'
import request from 'supertest'
import app from '../app'

const mockCreate = jest.fn()
const mockRemove = jest.fn()
const mockAssign  = jest.fn()
const mockKill = jest.fn()
const mockDestroy = jest.fn()
const mockGetData = jest.fn()

jest.mock('../weiClinic', () => {
    return jest.fn().mockImplementation(() => ({
        create: mockCreate,
        removeStackFromEnvelope: mockRemove,
        assignStackToEnvelope: mockAssign,
        killEnvelope: mockKill,
        destroy: mockDestroy,
        getData: mockGetData
    }))
})

beforeEach(() => {
  jest.clearAllMocks()
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

describe('APP Tests', () => {

    test('GET digitize', async () => {
        const query = {
            gender: GENDER,
            name: NAME,
            age: AGE
        }
        
        mockCreate.mockReturnValue(ResponseBody)

        const response = await request(app).get('/digitize').query(query)
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual(ResponseBody)
        expect(create).toHaveBeenCalledTimes(1)
        expect(create).toHaveBeenCalledWith(GENDER, NAME, AGE)
    })

    test('POST remove', async () => {

        mockRemove.mockReturnValue(status)

        const response = await  request(app).post('/remove/42').end()

        expect(response.status).toBe(status)
        expect(removeStackFromEnvelope).toBeCalledTimes(1)
        expect(removeStackFromEnvelope).toHaveBeenCalledWith(42)
    })

    test('PUT implant', async () => {
        mockAssign.mockReturnValue(status)

        const response = await request(app).put('/implant/7').end()

        expect(response.status).toBe(status)
        expect(assignStackToEnvelope).toBeCalledTimes(1)
        expect(assignStackToEnvelope).toHaveBeenCalledWith(7,NaN)
    })

    test('POST kill', async () => {

        mockKill.mockReturnValue(status)

        const response = await request(app).post('/kill/42').end()

        expect(response.status).toBe(status)
        expect(killEnvelope).toBeCalledTimes(1)
        expect(killEnvelope).toHaveBeenCalledWith(42)
    })

    test('DELETE truedeath', async() => {

        mockDestroy.mockReturnValue(status)

        const response = await request(app).delete('/truedeath/65').end()

        expect(response.status).toBe(status)
        expect(destroy).toBeCalledTimes(1)
        expect(destroy).toHaveBeenCalledWith(65)
    })

    test('GET find', async() => {
        mockGetData.mockReturnValue(ResponseBody)

        const response = await request(app).get('/find/44')

        expect(response.status).toBe(200)
        expect(response.body).toEqual(ResponseBody)
        expect(getData).toBeCalledTimes(1)
        expect(getData).toHaveBeenCalledWith(44)
    })

    test('GET not find', async() => {
        mockGetData.mockReturnValue(false)

        const response = await request(app).get('/find/44').end("Specified stack doesn't exist")

        expect(response.status).toBe(400)
        expect(mockGetData).toBeCalledTimes(1)
        expect(mockGetData).toHaveBeenCalledWith(44)
    })

})