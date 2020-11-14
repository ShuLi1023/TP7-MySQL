import {getClinic} from '../weiClinic'

const mockEnvelopeData = jest.fn()
const mockStackData = jest.fn()
const mockUpdateEnvelopeData = jest.fn()
const mockUpdateStackData = jest.fn()
const mockGetData = jest.fn()

jest.mock('../typeOrmDal', () => {
    return jest.fn().mockImplementation(() => ({
        createEnvelope: mockEnvelopeData,
        createStack : mockStackData,
        updateEnvelope: mockUpdateEnvelopeData,
        updateStack : mockUpdateStackData,
        getData: mockGetData
    }))
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('WeiClinic Tests', () => {

    test('Create Function', async () => {
       
        const Envelope = { id: 1, gender : "F", age : "11", idStack : null }
        const CorticalStack = {id : 2, realGender : "F", name : "abc", age : "11", idEnvelope: null}

        mockEnvelopeData.mockReturnValue(Envelope)
        mockStackData.mockReturnValue(CorticalStack)

        //console.log("Mock Envelope Data = " + mockEnvelopeData.mockReturnValue(Envelope))
        //console.log("Mock Stack Data = " + mockStackData.mockReturnValue(CorticalStack))

        CorticalStack['idEnvelope'] = 1;
        Envelope['idStack'] = 2;

        mockUpdateEnvelopeData.mockReturnValue(Envelope)
        mockUpdateStackData.mockReturnValue(CorticalStack)

        //console.log("Mock Envelope Data = " + mockUpdateEnvelopeData.mockReturnValue(Envelope))
        //console.log("Mock Stack Data = " + mockUpdateStackData.mockReturnValue(CorticalStack))

        const actualResult = await getClinic().create("F", "abc", 11)
        const expectedResult = [Envelope, CorticalStack]

        expect(actualResult).toEqual(expectedResult)
    })

})