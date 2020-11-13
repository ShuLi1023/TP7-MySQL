import CorticalStack from './corticalStack'
import Envelope from './envelope'

import TypeOrmDal from './typeOrmDal'

class WeiClinic {


    async create(gender, name, age) {
        const dal = new TypeOrmDal()
        const envelope = await dal.createEnvelope(gender, age)
        const stack = await dal.createStack(gender, name, age)

        envelope.idStack = stack.id
        stack.idEnvelope = envelope.id

        const newEnvelope = await dal.updateEnvelope(envelope.id, stack.id)
        const newStack = await dal.updateStack(stack.id, envelope.id)

        return [newEnvelope, newStack]
    }

    async assignStackToEnvelope(idStack, idEnvelope) {
        const dal = new TypeOrmDal()
          const stack = await dal.getCorticalStackData(idStack)
          if (stack != undefined) {
            if (stack.idEnvelope === null) {
              if (Number.isNaN(idEnvelope)) {
                const freeEnvelope = await dal.getFreeEnvelopeData()
                if (freeEnvelope != undefined) {
                    await dal.updateEnvelope(freeEnvelope.id, idStack)
                    await dal.updateStack(idStack, freeEnvelope.id)
                  return 204
                } else  return 400
              } else {
                const envelope = await dal.getEnvelopeData(idEnvelope)
                if (envelope != undefined) {
                  if (envelope.idStack === null) {
                    await dal.updateEnvelope(envelope.id, stack.id)
                    await dal.updateStack(idStack, idEnvelope)
                    return 204
                  } else  return 400
                } else return 404
              }
            } else return 400
          } else return 400
      }
    

    async removeStackFromEnvelope(idStack) {
        const dal = new TypeOrmDal()

        const stack = await dal.getCorticalStackData(idStack)
        if(stack === undefined && stack.idEnvelope === null){
            return 400
        }else{
            const removed = await dal.removeStackFromEnvelope(stack)
            if(removed){
                return 204
            }else{
                return 400
            }
        }

    }


    async killEnvelope(idEnvelope) {
        const dal = new TypeOrmDal()
        const status = await dal.killEnvelope(idEnvelope)
        return status
    }

    async destroyStack(idStack) {

    }

    async getData(stackId){
        const dal = new TypeOrmDal()
        const stack = await dal.getCorticalStackData(stackId)
        const envelope = await dal.getEnvelopeData(stack.idEnvelope)

        return {
            corticalStack: stack,
            envelope: envelope
        }
    }
}

export default WeiClinic