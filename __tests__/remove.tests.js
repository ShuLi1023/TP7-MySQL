import request from 'supertest'
import app from '../app'

import * as clinicDependency from '../weiClinic'

beforeEach(() => {
    clinicDependency.getClinic = jest.fn().mockReturnValue({
        removeStackFromEnvelope: jest.fn()
    })
})

describe('Remove action', () => {
    test('When ID found', (done) => {

        const removeStackFromEnvelope = jest.fn().mockReturnValue(true)

        clinicDependency.getClinic.mockReturnValue({
            removeStackFromEnvelope
        })

        request(app)
            .post('/remove/42')
            .expect(()=>{
                expect(removeStackFromEnvelope).toBeCalledTimes(1)
                expect(removeStackFromEnvelope).toHaveBeenCalledWith(42)
            })
            .expect(204)
            .end(done)
    })

    test('When ID can not be found', (done) => {

        const removeStackFromEnvelope = jest.fn().mockReturnValue(false)

        clinicDependency.getClinic.mockReturnValue({
            removeStackFromEnvelope
        })

        request(app)
            .post('/remove/42')
            .expect(()=>{
                expect(removeStackFromEnvelope).toBeCalledTimes(1)
                expect(removeStackFromEnvelope).toHaveBeenCalledWith(42)
            })
            .expect(400)
            .end(done)
    })
})