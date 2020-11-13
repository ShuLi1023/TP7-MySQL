import request from 'supertest'
import app from '../app'
import * as clinicDependency from '../weiClinic'


const AGE = "47"
const GENDER = 'M'
const NAME = 'Elias Ryker'
beforeEach(() => {
    clinicDependency.getClinic = jest.fn().mockReturnValue({
        create: jest.fn()
    })
})
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
})