import CorticalStack from './corticalStack'
import Envelope from './envelope'

import TypeOrmDal from './typeOrmDal'
import mysql from 'mysql2/promise'

class WeiClinic {
    

    async create(gender, name, age) {
        const dal = new TypeOrmDal()
        const newStack = await dal.addCorticalStack(gender, name, age, null)
        const newEnvelope = await dal.addEnvelope(gender, age, null)
        //console.log("Newly created elements:\n" + newStack.name + "\n" + newEnvelope.id)
        return [newStack, newEnvelope]
    }

    assignStackToEnvelope(idStack, idEnvelope) {
       
    }


    async removeStackFromEnvelope(idStack) {
        const dal = new TypeOrmDal()
        const status = await dal.removeStackFromEnvelope(idStack)
        return status
    }



    killEnvelope(idEnvelope) {

    }

    destroyStack(idStack) {

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
