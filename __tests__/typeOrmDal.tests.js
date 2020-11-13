const mockGetData = jest.fn()
const mockAdd = jest.fn()
jest.mock('../typeOrmDal', () => {
  return jest.fn().mockImplementation(() => ({
    getData: mockGetData,
    add: mockAdd
  }))
})

beforeEach(() => {
  jest.clearAllMocks()
})

