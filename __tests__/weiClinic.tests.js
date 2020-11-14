import WeiClinic from '../weiClinic'

const mockCreateEnvelope = jest.fn()
const mockCreateStack = jest.fn()
const mockGetEnvelope = jest.fn()
const mockGetStack = jest.fn()
const mockUpdateEnvelope = jest.fn()
const mockUpdateStack = jest.fn()
const mockDeleteEnvelope = jest.fn()
const mockDeleteStack = jest.fn()
const mockGetData = jest.fn()

jest.mock('../typeOrmDal', () => {
    return jest.fn().mockImplementation(() => ({
        createEnvelope : mockCreateEnvelope,
        createStack : mockCreateStack,
        getEnvelope : mockGetEnvelope,
        getCorticalStack : mockGetStack,
        updateEnvelope: mockUpdateEnvelope,
        updateStack : mockUpdateStack,
        deleteEnvelope : mockDeleteEnvelope,
        deleteStack : mockDeleteStack,
        getData : mockGetData
    }))
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('WeiClinic Tests', () => {

    test('Create Function', async () => {
        const weiClinic = new WeiClinic()
        const Envelope = { id: 1, gender : "F", age : "11", idStack : null }
        const CorticalStack = {id : 2, realGender : "F", name : "abc", age : "11", idEnvelope: null}

        mockCreateEnvelope.mockReturnValue(Envelope)
        mockCreateStack.mockReturnValue(CorticalStack)

        //console.log("Mock Envelope Data = " + mockCreateEnvelope.mockReturnValue(Envelope))
        //console.log("Mock Stack Data = " + mockCreateStack.mockReturnValue(CorticalStack))

        CorticalStack['idEnvelope'] = 1;
        Envelope['idStack'] = 2;

        mockUpdateEnvelope.mockReturnValue(Envelope)
        mockUpdateStack.mockReturnValue(CorticalStack)

        //console.log("Mock Envelope Data = " + mockUpdateEnvelope.mockReturnValue(Envelope))
        //console.log("Mock Stack Data = " + mockUpdateStack.mockReturnValue(CorticalStack))

        const actualResult = await weiClinic.create("F", "abc", 11)
        const expectedResult = [Envelope, CorticalStack]

        expect(actualResult).toEqual(expectedResult)
        expect(mockCreateEnvelope).toHaveBeenCalledWith("F", 11)
        expect(mockCreateStack).toHaveBeenCalledWith("F", "abc", 11)
        expect(mockUpdateEnvelope).toHaveBeenCalledWith(1, 2)
        expect(mockUpdateStack).toHaveBeenCalledWith(2, 1)
    })

    test('Remove Function - When stack is embedded in an Envelope', async () => {
       
        const weiClinic = new WeiClinic()
        const CorticalStack = {id : 2, realGender : "F", name : "abc", age : "11", idEnvelope: 1}

        mockGetStack.mockReturnValue(CorticalStack)
        mockUpdateEnvelope.mockReturnValue(true)
        mockUpdateStack.mockReturnValue(true)

        const actualResult = await weiClinic.removeStackFromEnvelope(2)
        const expectedResult = 204

        expect(actualResult).toEqual(expectedResult)
        expect(mockGetStack).toHaveBeenCalledWith(2)
        expect(mockUpdateEnvelope).toHaveBeenCalledWith(1, null)
        expect(mockUpdateStack).toHaveBeenCalledWith(2, null)
    })

    test('Remove Function - When stack is not embedded in an Envelope', async () => {
        const weiClinic = new WeiClinic()
        const CorticalStack = {id : 2, realGender : "F", name : "abc", age : "11", idEnvelope: null}

        mockGetStack.mockReturnValue(CorticalStack)
        mockUpdateEnvelope.mockReturnValue(true)
        mockUpdateStack.mockReturnValue(true)

        const actualResult = await weiClinic.removeStackFromEnvelope(2)
        const expectedResult = 400

        expect(actualResult).toEqual(expectedResult)
        expect(mockGetStack).toHaveBeenCalledWith(2)
    })

    test('Remove Function - When stack cannot be found', async () => {
        const weiClinic = new WeiClinic()
        mockGetStack.mockReturnValue(undefined)
        mockUpdateEnvelope.mockReturnValue(true)
        mockUpdateStack.mockReturnValue(true)

        const actualResult = await weiClinic.removeStackFromEnvelope(2)
        const expectedResult = 400

        expect(actualResult).toEqual(expectedResult)
        expect(mockGetStack).toHaveBeenCalledWith(2)
    })

    test('Kill Function - When stack is embedded in an Envelope', async () => {
        const weiClinic = new WeiClinic()
        const Envelope = { id: 1, gender : "F", age : "11", idStack : 2 }

        mockGetEnvelope.mockReturnValue(Envelope)
        mockDeleteEnvelope.mockReturnValue(true)
        mockUpdateStack.mockReturnValue(true)

        const actualResult = await weiClinic.killEnvelope(1)
        const expectedResult = 204

        expect(actualResult).toEqual(expectedResult)
        expect(mockGetEnvelope).toHaveBeenCalledWith(1)
        expect(mockDeleteEnvelope).toHaveBeenCalledWith(1)
        expect(mockUpdateStack).toHaveBeenCalledWith(2, null)
    })

    test('Kill Function - When Envelope is empty', async () => {
        const weiClinic = new WeiClinic()
        const Envelope = { id: 1, gender : "F", age : "11", idStack : null }

        mockGetEnvelope.mockReturnValue(Envelope)
        mockDeleteEnvelope.mockReturnValue(true)

        const actualResult = await weiClinic.killEnvelope(1)
        const expectedResult = 204

        expect(actualResult).toEqual(expectedResult)
        expect(mockGetEnvelope).toHaveBeenCalledWith(1)
        expect(mockDeleteEnvelope).toHaveBeenCalledWith(1)
        expect(mockUpdateStack).not.toHaveBeenCalled()
    })

    test('Kill Function - When Envelope does not exist', async () => {
        const weiClinic = new WeiClinic()
        mockGetEnvelope.mockReturnValue(undefined)

        const actualResult = await weiClinic.killEnvelope(1)
        const expectedResult = 400

        expect(actualResult).toEqual(expectedResult)
        expect(mockGetEnvelope).toHaveBeenCalledWith(1)
        expect(mockDeleteEnvelope).not.toHaveBeenCalled()
        expect(mockUpdateStack).not.toHaveBeenCalled()
    })

    test('True Death Function - When stack is embedded in an Envelope', async () => {
        const weiClinic = new WeiClinic()
        const CorticalStack = {id : 2, realGender : "F", name : "abc", age : "11", idEnvelope: 1}

        mockGetStack.mockReturnValue(CorticalStack)
        mockDeleteStack.mockReturnValue(true)
        mockDeleteEnvelope.mockReturnValue(true)

        const actualResult = await weiClinic.destroy(2)
        const expectedResult = 204

        expect(actualResult).toEqual(expectedResult)
        expect(mockGetStack).toHaveBeenCalledWith(2)
        expect(mockDeleteEnvelope).toHaveBeenCalledWith(1)
        expect(mockDeleteStack).toHaveBeenCalledWith(2)
    })

    test('True Death Function - When stack is not embedded in an Envelope', async () => {
        const weiClinic = new WeiClinic()
        const CorticalStack = {id : 2, realGender : "F", name : "abc", age : "11", idEnvelope: null}

        mockGetStack.mockReturnValue(CorticalStack)
        mockDeleteStack.mockReturnValue(true)
        const actualResult = await weiClinic.destroy(2)
        const expectedResult = 204

        expect(actualResult).toEqual(expectedResult)
        expect(mockGetStack).toHaveBeenCalledWith(2)
        expect(mockDeleteStack).toHaveBeenCalledWith(2)
        expect(mockDeleteEnvelope).not.toHaveBeenCalled()
    })

    test('True Death Function - When stack does not exist', async () => {
        const weiClinic = new WeiClinic()
        mockGetStack.mockReturnValue(undefined)
        const actualResult = await weiClinic.destroy(2)
        const expectedResult = 400

        expect(actualResult).toEqual(expectedResult)
        expect(mockGetStack).toHaveBeenCalledWith(2)
        expect(mockDeleteStack).not.toHaveBeenCalled()
        expect(mockDeleteEnvelope).not.toHaveBeenCalled()

    })

})