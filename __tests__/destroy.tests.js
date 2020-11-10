import request from 'supertest'
import app from '../app'

import * as clinicDependency from '../weiClinic'

beforeEach(() => {
    clinicDependency.getClinic = jest.fn().mockReturnValue({
        destroyStack: jest.fn()
    })
})

describe('destroy action', () => {
    test('When ID can be found', (done) => {

        const destroyStack = jest.fn().mockReturnValue(true)

        clinicDependency.getClinic.mockReturnValue({
            destroyStack
        })

        request(app)
            .delete('/truedeath/65')
            .expect(()=>{
                expect(destroyStack).toBeCalledTimes(1)
                expect(destroyStack).toHaveBeenCalledWith(65)
            })
            .expect(204)
            .end(done)
    })

    test('When ID can not be found', (done) => {

        const destroyStack = jest.fn().mockReturnValue(false)

        clinicDependency.getClinic.mockReturnValue({
            destroyStack
        })

        request(app)
            .delete('/truedeath/65')
            .expect(()=>{
                expect(destroyStack).toBeCalledTimes(1)
                expect(destroyStack).toHaveBeenCalledWith(65)
            })
            .expect(400)
            .end(done)
    })
})