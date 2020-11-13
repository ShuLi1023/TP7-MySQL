import { createConnection } from 'typeorm'
import {getRepository} from "typeorm";

import CorticalStack from './corticalStack'
import Envelope from './envelope'

import { envelopeSchema } from './envelopeSchema'
import { stackSchema } from './corticalStackSchema'

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
        entities: [envelopeSchema, stackSchema]
      })
    } catch (err) {
      console.error('Unable to connect')
      throw err
    }
  }



  async createEnvelope(gender, age) {
    const connection = await this.connect()

    try {

      const envelopeRepository = connection.getRepository(Envelope)
      const envelope = new Envelope(null, gender, age, null)

      await envelopeRepository.insert(envelope)
      const newEnvelope = await envelopeRepository.findOne({select:['id'],order: {id:"DESC"}})

      return newEnvelope
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

   async createStack(gender, name, age) {
    const connection = await this.connect()

    try {

      const stackRepository = connection.getRepository(CorticalStack)
      const stack = new CorticalStack(null, gender, name, age, null)
      await stackRepository.insert(stack)

      const newCorticalStack = await stackRepository.findOne({select:['id'],order: {id:"DESC"}})

      return newCorticalStack
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

  async updateEnvelope(envelopeId, stackId){
    const connection = await this.connect()
    try{
      const envelopeRepository = connection.getRepository(Envelope)
      await envelopeRepository.update(envelopeId, {idStack : stackId })
      const envelope = await envelopeRepository.findOne({id: envelopeId})
      return envelope
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

  async updateStack(stackId, envelopeId){
    const connection = await this.connect()
    try{
      const stackRepository = connection.getRepository(CorticalStack)
      await stackRepository.update(stackId, {idEnvelope : envelopeId })
      const stack = await stackRepository.findOne({id: stackId})
      return stack
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

  async getCorticalStackData(idStack) {
    const connection = await this.connect()
    try {
      const stackRepository = connection.getRepository(CorticalStack)
      const corticalStack = await stackRepository.findOne({id: idStack})
      return corticalStack
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

  async getEnvelopeData(idEnvelope) {
    const connection = await this.connect()
    try {
      const envelopeRepository = connection.getRepository(Envelope)

      const envelope = await envelopeRepository.findOne({id: idEnvelope})
      return envelope
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

  async getFreeEnvelopeData() {
    const connection = await this.connect()
    try {
      const envelopeRepository = connection.getRepository(Envelope)

      const envelope = await envelopeRepository.findOne({idStack: null})
      return envelope
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

<<<<<<< HEAD
async removeStackFromEnvelope(stack){
=======
  async deleteEnvelope(idEnvelope){
    const connection = await this.connect()
    const envelopeRepository = connection.getRepository(Envelope)
    try{
      await envelopeRepository.delete({id: idEnvelope });
    }
    catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

  async deleteStack(idStack){
    const connection = await this.connect()
    const stackRepository = connection.getRepository(CorticalStack)
    try{
      await stackRepository.delete({id: idStack });
    }
    catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }
  /*
  async addCorticalStack(realGender, name, age, idEnvelope) {
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
*/

async removeStackFromEnvelope(stackId){
>>>>>>> dfbed07a3dd5ee2abfbee18929f6b4d5557d8a93
  const connection = await this.connect()

    try {
      const stackRepository = connection.getRepository(CorticalStack)
      const envelopeRepository = connection.getRepository(Envelope)

      await stackRepository.update(stack.id, { idEnvelope: null });
      await envelopeRepository.update(stack.idEnvelope,{idStack : null})
      console.log("Stack and Envelope updated")
      return true
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
}


async killEnvelope(idEnvelope) {

    const connection = await this.connect()
    try{
      const envelopeRepository = connection.getRepository(Envelope)
      
      const envelope = await envelopeRepository.findOne({id: idEnvelope})
      console.log("Envelope = " + envelope)

      if(envelope != undefined){

        if(envelope.idStack == null){
          await envelopeRepository.delete(idEnvelope)
          console.log("Empty Envelope Deleted")
        }else{
          await envelopeRepository.delete(idEnvelope)
          const stackRepository = connection.getRepository(CorticalStack)
          await stackRepository.update(envelope.idStack, { idEnvelope: null });
          console.log("Stack removed from Envelope & Envelope deleted")
        }
        return 204
      }else{
        return 400
      }
    } catch (err) {
      console.error(err.message)
    } finally {
      await connection.close()
    }

}


}

export default TypeOrmDal
