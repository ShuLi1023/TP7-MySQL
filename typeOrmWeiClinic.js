import { createConnection } from 'typeorm'
import CorticalStack from './corticalStack'
import Envelope from './envelope'

import { envelopeSchema } from './envelopeSchema'
import { stackSchema } from './corticalStackSchema'

class TypeOrmWeiClinic {
  async connect() {
    try {
      return await createConnection({
        type: 'mysql',
        host: '0.0.0.0',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'db_alteredCarbon',
        entities: [envelopeSchema, stackSchema],
      })
    } catch (err) {
      console.error('Unable to connect')
      throw err
    }
  }


  async create(gender, name, age) {
    const connection = await this.connect()

    try {
      const envelopeRepository = connection.getRepository(Envelope)
      const stackRepository = connection.getRepository(CorticalStack)
      const newEnvelope = new Envelope(null, gender, age, null)
      const newCorticalStack = new CorticalStack(null, gender, name, age, null)
      
      await envelopeRepository.insert(newEnvelope)
      await stackRepository.insert(newCorticalStack)
      const env = await envelopeRepository.findOne({select:['id'],order: {id:"DESC"}})
      const stack = await stackRepository.findOne({select:['id'],order: {id:"DESC"}})
      
      await envelopeRepository.update(env.id,{idStack : stack.id})
      await stackRepository.update(stack.id,{idEnvelope : env.id})
      newCorticalStack.idEnvelope = env.id
      newEnvelope.idStack = stack.id
      
      return [newCorticalStack, newEnvelope]
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

  async assignStackToEnvelope(idStack, idEnvelope) {
    const connection = await this.connect()

    try {
      
      return 
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

  async removeStackFromEnvelope(idStack) {
    const connection = await this.connect()

    try {
     
      
      return 
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

  killEnvelope(idEnvelope) {

  }

  destroyStack(idStack) {

}
}

export default TypeOrmWeiClinic
