import CorticalStack from './corticalStack'
import Envelope from './Envelope'

import TypeOrmDal from './typeOrmDal'
import mysql from 'mysql2/promise'

class WeiClinic {
    

    async create(gender, name, age) {
        const dal = new TypeOrmDal()
        const newStack = dal.addCorticalStack(gender, name, age, null)
        const newEnvelope = dal.addEnvelope(gender, age, null)
        return [newStack, newEnvelope]
    }

    assignStackToEnvelope(idStack, idEnvelope) {
       
    }


    removeStackFromEnvelope(idStack) {
        
    }



    killEnvelope(idEnvelope) {

    }

    destroyStack(idStack) {

}
}

export default WeiClinic
