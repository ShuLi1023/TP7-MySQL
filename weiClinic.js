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
          const stack = await dal.getCorticalStack(idStack)
          if (stack != undefined && stack.idEnvelope === null) {
              if (Number.isNaN(idEnvelope)) {
                const freeEnvelope = await dal.getFreeEnvelope()
                if (freeEnvelope != undefined) {
                    await dal.updateEnvelope(freeEnvelope.id, idStack)
                    await dal.updateStack(idStack, freeEnvelope.id)
                  return 204
                } else  return 400
              } else {
                const envelope = await dal.getEnvelope(idEnvelope)
                if (envelope != undefined) {
                  if (envelope.idStack === null) {
                    await dal.updateEnvelope(envelope.id, stack.id)
                    await dal.updateStack(idStack, idEnvelope)
                    return 204
                  } else  return 400
                } else return 404
              }
          } else return 400
      }
    

    async removeStackFromEnvelope(idStack) {
        const dal = new TypeOrmDal()

        const stack = await dal.getCorticalStack(idStack)
        if(stack !== undefined && stack.idEnvelope !== null){
            await dal.updateStack(stack.id, null);
            await dal.updateEnvelope(stack.idEnvelope, null)
            return 204
        }else return 400
    }


    async killEnvelope(idEnvelope) {
        const dal = new TypeOrmDal()
        const envelope = await dal.getEnvelope(idEnvelope)

        if(envelope !== undefined){
            if(envelope.idStack === null){
                await dal.deleteEnvelope(idEnvelope)
            }else{
                await dal.updateStack(envelope.idStack, null)
                await dal.deleteEnvelope(idEnvelope)
            }
            return 204
        }else return 400
        
    }

    async destroy(idStack) {
        const dal = new TypeOrmDal()
        const stack = await dal.getCorticalStack(idStack)
        if(stack){
          await dal.deleteStack(idStack)
          if(stack.idEnvelope !==  null){
            await dal.deleteEnvelope(stack.idEnvelope)
          }
          console.log("Stack and Envelope destroied")
          return 204
        }
        else return 400
    }

    async getData(stackId){
        const dal = new TypeOrmDal()
        const stack = await dal.getCorticalStack(stackId)
        if(stack === undefined){
            return false
        }

        if(stack.idEnvelope != null){
            const envelope = await dal.getEnvelope(stack.idEnvelope)
            return [envelope,stack]     
        }else if(stack != undefined){
            return stack
        }
    }
}

export default WeiClinic
