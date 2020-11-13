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

    assignStackToEnvelope(idStack, idEnvelope) {

    }

    async removeStackFromEnvelope(idStack) {
        const dal = new TypeOrmDal()
        const status = await dal.removeStackFromEnvelope(idStack)
        return status
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