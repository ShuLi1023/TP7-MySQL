import { getClinic } from '../weiClinic'

describe('WeiClinic', () => {

    test('WeiClinic constructor', () => {
        const expectedResult = {
            envelopes : [],
            stacks : []
        }

        const actualResult = new getClinic
        expect(actualResult).toEqual(expectedResult)
    })

    test('Create Function',() => {
        const getNewId = jest.fn().mockReturnValue(1)
       
        const CorticalStack = {
            id : getNewId(),
            realGender : "F",
            name : "abc",
            age : "11",
            idEnvelope: getNewId()
        }

        const Envelope = {
            id: getNewId(),
            gender : "F",
            age : "11",
            idStack : getNewId()
        }

        const expectedResult = {
            corticalStack: CorticalStack,
            envelope: Envelope
        }
        const actualResult = getClinic().create("F","abc","11")
        expect(actualResult).toEqual(expectedResult)
    })

    test('Remove function, If Stack Id can be found and is implanted ',() => {

        getClinic().envelopes = [ {id: 1, idStack: 1} ]
        getClinic().stacks = [ {id: 1, idEnvelope: 1} ]

        const removed = getClinic().removeStackFromEnvelope(1)
        expect(null).toBe(getClinic().stacks[0].idEnvelope)
        expect(null).toBe(getClinic().envelopes[0].idStack)
        expect(1).toBe(getClinic().envelopes.length)
        expect(1).toBe(getClinic().stacks.length)
        expect(removed).toBeTruthy
    })

    test('Remove function, If Stack Id can be found but is not implanted ',() => {

        getClinic().envelopes = [ {id: 1, idStack: null} ]
        getClinic().stacks = [ {id: 1, idEnvelope: null} ]

        const removed = getClinic().removeStackFromEnvelope(1)
        expect(1).toBe(getClinic().envelopes.length)
        expect(1).toBe(getClinic().stacks.length)
        expect(removed).toBeFalsy
    })

    test('Remove function, If Stack Id can not be found',() => {

        getClinic().envelopes = [ {id: 1, idStack: 1} ]
        getClinic().stacks = [ {id: 1, idEnvelope: 1} ]

        const removed = getClinic().removeStackFromEnvelope(2)
        expect(1).toBe(getClinic().stacks[0].idEnvelope)
        expect(1).toBe(getClinic().envelopes[0].idStack)
        expect(1).toBe(getClinic().envelopes.length)
        expect(1).toBe(getClinic().stacks.length)
        expect(removed).toBeFalsy
    })

    test('Assign Stack To Envelope when Stack Id cannot be found and Envelope Id is not given',() => {

        getClinic().envelopes = [ {id: 1, idStack: null} ]
        getClinic().stacks = [ {id: 1, idEnvelope: null} ]

        const actualResult = getClinic().assignStackToEnvelope(2,)

        expect(actualResult).toBe('2')
    })

    test('Assign Stack To Envelope when Stack Id found but not avaliable and Envelope Id not given',() => {

        getClinic().envelopes = [ {id: 1, idStack: null} ]
        getClinic().stacks = [ {id: 1, idEnvelope: 2} ]

        const actualResult = getClinic().assignStackToEnvelope(1,NaN)

        expect(actualResult).toBe('2')
    })

    test('Assign Stack To Envelope when Stack Id found, is avaliable but Envelope Id is not given',() => {

        getClinic().envelopes = [ {id: 1, idStack: null} ]
        getClinic().stacks = [ {id: 1, idEnvelope: null} ]

        const actualResult = getClinic().assignStackToEnvelope(1,NaN)

        expect(getClinic().stacks[0].idEnvelope).toBe(1)
        expect(getClinic().envelopes[0].idStack).toBe(1)
        expect(actualResult).toBe('1')
    })

    test('Assign Stack To Envelope when Stack Id found, avaliable but Envelope Id is not found',() => {

        getClinic().envelopes = [ {id: 1, idStack: null} ]
        getClinic().stacks = [ {id: 1, idEnvelope: null} ]

        const actualResult = getClinic().assignStackToEnvelope(1,2)

        expect(actualResult).toBe('3')
    })

    test('Assign Stack To Envelope when Stack Id found, is avaliable and Envelope Id is found but not avaliable',() => {

        getClinic().envelopes = [ {id: 1, idStack: 2} ]
        getClinic().stacks = [ {id: 1, idEnvelope: null} ]

        const actualResult = getClinic().assignStackToEnvelope(1,1)

        expect(actualResult).toBe('2')
    })

    test('Assign Stack To Envelope when Stack Id found and avaliable and Envelope Id is found and avaliable',() => {

        getClinic().envelopes = [ {id: 1, idStack: null} ]
        getClinic().stacks = [ {id: 1, idEnvelope: null} ]

        const actualResult = getClinic().assignStackToEnvelope(1,1)

        expect(getClinic().stacks[0].idEnvelope).toBe(1)
        expect(getClinic().envelopes[0].idStack).toBe(1)
        expect(actualResult).toBe('1')
    })

    test('Kill Envelope with Stack', () => {
        const expectedResult = true
        getClinic().envelopes = [ {id: 1, idStack: 2} ]
        getClinic().stacks = [ {id: 2, idEnvelope: 1} ]

        const actualResult = getClinic().killEnvelope(1)

        expect(actualResult).toBe(expectedResult)
        expect(getClinic().envelopes.length).toBe(0)
        expect(getClinic().stacks[0].idEnvelope).toBe(null)
    })

    test('Kill Envelope without Stack', () => {
        const expectedResult = true
        getClinic().envelopes = [ {id: 1, idStack: null} ]

        const actualResult = getClinic().killEnvelope(1)

        expect(actualResult).toBe(expectedResult)
        expect(getClinic().envelopes.length).toBe(0)
    })

    test('Attempt to Kill nonexisting Envelope', () => {

        const expectedResult = false
        getClinic().envelopes = []

        const actualResult = getClinic().killEnvelope(1)

        expect(actualResult).toBe(expectedResult)

    })

    test('True Death to Stack implanted in Envelope', () => {
        const expectedResult = true

        getClinic().envelopes = [ {id: 1, idStack: 2} ]
        getClinic().stacks = [ {id: 2, idEnvelope: 1} ]

        const actualResult = getClinic().destroyStack(2)

        expect(actualResult).toBe(expectedResult)
        expect(getClinic().envelopes.length).toBe(0)
        expect(getClinic().stacks.length).toBe(0)
    })

})
