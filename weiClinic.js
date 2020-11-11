import CorticalStack from './corticalStack'
import Envelope from './envelope'

import TypeOrmDal from './typeOrmDal'

class WeiClinic {
    

    async create(gender, name, age) {
        const dal = new TypeOrmDal()
        const newElements = await dal.create(gender, name, age)
         return newElements
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
