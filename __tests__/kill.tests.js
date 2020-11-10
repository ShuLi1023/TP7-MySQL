import request from 'supertest'
import app from '../app'

import * as clinicDependency from '../weiClinic'

beforeEach(() => {
    clinicDependency.getClinic = jest.fn().mockReturnValue({
        killEnvelope: jest.fn()
    })
})

describe('Kill Feature', () => {
    test('When Envelope Id can be found', (done) => {

        const killEnvelope = jest.fn().mockReturnValue(true)

        clinicDependency.getClinic.mockReturnValue({
            killEnvelope
        })

        request(app)
            .post('/kill/42')
            .expect(()=>{
                expect(killEnvelope).toBeCalledTimes(1)
                expect(killEnvelope).toHaveBeenCalledWith(42)
            })
            .expect(204)
            .end(done)
    })

    test('When Envelope Id can not be found', (done) => {

        const killEnvelope = jest.fn().mockReturnValue(false)

        clinicDependency.getClinic.mockReturnValue({
            killEnvelope
        })

        request(app)
            .post('/kill/42')
            .expect(()=>{
                expect(killEnvelope).toBeCalledTimes(1)
                expect(killEnvelope).toHaveBeenCalledWith(42)
            })
            .expect(400)
            .end(done)
    })
})