import { createConnection } from 'typeorm'
import { getConnection } from 'typeorm'
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

  async getEnvelopeData(idEnvelope) {
    const connection = await this.connect()
    try {
      //const dataRepository = connection.getRepository(Envelope)

      const envelope = await getRepository(Envelope)
        .createQueryBuilder("Envelope")
        .where("Envelope.id = :id", { id: idEnvelope })
        .getOne();

      return envelope
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
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

  async getCorticalStackData(idStack) {
    const connection = await this.connect()
    try {
      const corticalStack = await getRepository(CorticalStack)
        .createQueryBuilder("CorticalStack")
        .where("CorticalStack.id = :id", { id: idStack })
        .getOne();

      return corticalStack
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      await connection.close()
    }
  }

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

async removeStackFromEnvelope(stackId){
  const connection = await this.connect()

  console.log("Given Id = " + stackId)

    try {
      const stackRepository = connection.getRepository(CorticalStack)
      const envelopeRepository = connection.getRepository(Envelope)

      const stack = await stackRepository.findOne({id: stackId})
      console.log("Stack found = " + stack.name)

      if(stack.idEnvelope != null){
        //const stack = await stackRepository.findOne({id: stackId})
        //console.log("Stack found = " + stack.name)

        await stackRepository.update(stackId, { idEnvelope: null });
        await envelopeRepository.update(stack.idEnvelope,{idStack : null})
        console.log("Stack and Envelope updated")

        return 204
      }else{
        return 400
      }
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

async destroyStack(idStack) {
  const connection = await this.connect()

  try {
    const stackRepository = connection.getRepository(CorticalStack)
    const envelopeRepository = connection.getRepository(Envelope)

    const stack = await stackRepository.findOne({id : idStack})
    console.log("Stack found = " + stack)

  if(stack){
    await stackRepository.delete({id: idStack });
    if(stack.idEnvelope !==  null){
      await envelopeRepository.delete({id : stack.idEnvelope})
    }
    console.log("Stack and Envelope destroied")

    return 204
  }else{
    return 400
  }
} catch (err) {
  console.error(err.message)
  throw err
} finally {
  await connection.close()
}
}
}

export default TypeOrmDal
