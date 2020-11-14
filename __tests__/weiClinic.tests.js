import {getClinic} from '../weiClinic'

const mockCreateEnvelope = jest.fn()
const mockCreateStack = jest.fn()
const mockGetEnvelope = jest.fn()
const mockGetStack = jest.fn()
const mockUpdateEnvelope = jest.fn()
const mockUpdateStack = jest.fn()
const mockGetData = jest.fn()

jest.mock('../typeOrmDal', () => {
    return jest.fn().mockImplementation(() => ({
        createEnvelope : mockCreateEnvelope,
        createStack : mockCreateStack,
        getEnvelope : mockGetEnvelope,
        getCorticalStack : mockGetStack,
        updateEnvelope: mockUpdateEnvelope,
        updateStack : mockUpdateStack,
        getData : mockGetData
    }))
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('WeiClinic Tests', () => {

    test('Create Function', async () => {
       
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

        const actualResult = await getClinic().create("F", "abc", 11)
        const expectedResult = [Envelope, CorticalStack]

        expect(actualResult).toEqual(expectedResult)
        expect(mockCreateEnvelope).toHaveBeenCalledWith("F", 11)
        expect(mockCreateStack).toHaveBeenCalledWith("F", "abc", 11)
        expect(mockUpdateEnvelope).toHaveBeenCalledWith(1, 2)
        expect(mockUpdateStack).toHaveBeenCalledWith(2, 1)
    })

    test('Remove Function - When stack is embedded in an Envelope', async () => {
       
        const CorticalStack = {id : 2, realGender : "F", name : "abc", age : "11", idEnvelope: 1}

        mockGetStack.mockReturnValue(CorticalStack)

        mockUpdateEnvelope.mockReturnValue(true)
        mockUpdateStack.mockReturnValue(true)

        //console.log("Mock Envelope Data = " + mockUpdateEnvelope.mockReturnValue(Envelope))
        //console.log("Mock Stack Data = " + mockUpdateStack.mockReturnValue(CorticalStack))

        const actualResult = await getClinic().removeStackFromEnvelope(2)
        const expectedResult = 204

        expect(actualResult).toEqual(expectedResult)
        expect(mockUpdateEnvelope).toHaveBeenCalledWith(1, null)
        expect(mockUpdateStack).toHaveBeenCalledWith(2, null)
    })

})