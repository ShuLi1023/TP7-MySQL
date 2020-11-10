import { createConnection } from 'typeorm'
import CorticalStack from './corticalStack'
import Envelope from './Envelope'

import { envelopeSchema } from './envelopeSchema'
import { corticalStackSchema } from './corticalStackSchema'

class TypeOrmDal {
  async connect() {
    try {
      return await createConnection({
        type: 'mysql',
        host: '0.0.0.0',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'db_alteredCarbon',
        entities: [envelopeSchema, corticalStackSchema]
      })
    } catch (err) {
      console.error('Unable to connect')
      throw err
    }
  }

  async getEnvelopeData() {
    const connection = await this.connect()

    try {
      const dataRepository = connection.getRepository(Envelope)

      return await dataRepository.find()
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

  async addEnvelope(gender, age, idStack) {
    const connection = await this.connect()

    try {
      const dataRepository = connection.getRepository(Envelope)
      const newData = new Envelope(null, gender, age, idStack)

      await dataRepository.save(newData)
      return newData
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

  async getCorticalStackData() {
    const connection = await this.connect()

    try {
      const dataRepository = connection.getRepository(CorticalStack)

      return await dataRepository.find()
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

  async addCorticalStack(realGender, name, age, idStack) {
    const connection = await this.connect()

    try {
      const dataRepository = connection.getRepository(CorticalStack)
      const newData = new CorticalStack(null, realGender, name, age, idEnvelope)

      await dataRepository.save(newData)
      return newData
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
}
}

export default TypeOrmDal
