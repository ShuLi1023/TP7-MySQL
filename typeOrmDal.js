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

async removeStackFromEnvelope(id){
  //const connection = await this.connect()

    try {

      const stack = await this.getCorticalStackData(id)
      console.log("Stack DATA FOUND! " + stack.name)
      //const stack = this.getCorticalStackData(id)

      if(stack){

        const connection = await this.connect()

        await connection
        .createQueryBuilder()
        .update(CorticalStack)
        .set({ idEnvelope: null})
        .where("id = :id", { id: id })
        .execute()

        /*
        await getConnection
        .createQueryBuilder()
        .update(Envelope)
        .set({ idStack: null})
        .where("id = :id", { id: id })
        .execute()
        */
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
