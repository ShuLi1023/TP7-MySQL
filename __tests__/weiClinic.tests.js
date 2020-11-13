const mockcreateEnvelope = jest.fn()
const mockcreateStack = jest.fn()
const mockupdateEnvelope = jest.fn()
const mockupdateStack = jest.fn()
const mockgetCorticalStack = jest.fn()

jest.mock('../typeOrmDal', () => {
    return jest.fn().mockImplementation(() => ({
      getData: mockGetData,
      add: mockAdd
    }))
  })