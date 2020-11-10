import { getNewId } from './idHelper'
import CorticalStack from './corticalStack'
import Envelope from './Envelope'

class WeiClinic {
    constructor() {
        this.envelopes = []
        this.stacks = []
    }

    create(realGender, name, age) {
        const stackId = getNewId(this.stacks)
        const envelopeId = getNewId(this.envelopes)
        const newStack = new CorticalStack(stackId, realGender, name, age, envelopeId)
        const newEnvelope = new Envelope(envelopeId, realGender, age, stackId)

        this.stacks.push(newStack)
        this.envelopes.push(newEnvelope)

        return {
            corticalStack: newStack,
            envelope: newEnvelope
        }
    }

    assignStackToEnvelope(idStack, idEnvelope) {
        const findStack = getClinic().stacks.find(stack => stack.id === idStack)
        if(findStack){
            const isStackAvaliable = findStack.idEnvelope === null
            if(isStackAvaliable){
                if(!Number.isNaN(idEnvelope)){
                    const findEnvelope = getClinic().envelopes.find(envelope => envelope.id === idEnvelope)
                    if(!findEnvelope){
                        return '3'
                    }
                    const isEnvelopeAvaliable = findEnvelope.idStack === null
                    if(isEnvelopeAvaliable){
                        this.envelopes.find(envelope => envelope.id === idEnvelope).idStack = idStack
                        this.stacks.find(stack => stack.id === idStack).idEnvelope = idEnvelope
                        return '1'
                    }
                    else{
                        return '2'
                    }
                    
                }
                else {
                    const availableEnvelope =getClinic().envelopes.find(envelope => envelope.idStack === null)
                    if (availableEnvelope) {
                        this.envelopes.find(envelope => envelope.id === availableEnvelope.id).idStack = idStack
                        this.stacks.find(stack => stack.id === idStack).idEnvelope = availableEnvelope.id
                        return '1'
                    } else {
                        return '2'
                    }
                } 
            }
            else{
                return '2'
            } 
        }
        else{
            return '2'
        }   
    }


    removeStackFromEnvelope(idStack) {
        const stackFound = this.stacks.find(stack => stack.id === idStack)

        if(stackFound){
            for(let i=0; i < this.stacks.length; i++){
                if(this.stacks[i].id === idStack ){
                    if(this.stacks[i].idEnvelope !== null) {
                        for(let j=0; j < this.envelopes.length; j++){
                            if(this.envelopes[j].id === this.stacks[i].idEnvelope){
                                this.envelopes[j].idStack = null  
                            }
                        }
                    }else{
                        return false
                    }
                    this.stacks[i].idEnvelope = null
                    return true
                }
            }
        }else{
            return false
        }
    }



    killEnvelope(idEnvelope) {

        const envelopeFound = getClinic().envelopes.find(envelope => envelope.id === idEnvelope)

        if(envelopeFound){
            for(let i=0; i < this.envelopes.length; i++){
                if(this.envelopes[i].id === idEnvelope){
                    if(this.envelopes[i].idStack != null){
                        const stackId = this.envelopes[i].idStack
                        for(let j=0; j < this.stacks.length; j++){
                            if(this.stacks[j].id === stackId){
                                this.stacks[j].idEnvelope = null
                                break
                            }
                        }
                    }
                    this.envelopes.splice(i,1)
                    return true
                }
            }
        }else{
            return false
        }

    }

    destroyStack(idStack) {

        const findStack = getClinic().stacks.find(stack => stack.id === idStack)
        
        if (findStack) {
            this.stacks = this.stacks.filter(filterStack => filterStack.id !== idStack)
            if (findStack.idEnvelope !== null) {
                this.envelopes = this.envelopes.filter(filterEnvelope => filterEnvelope.id !== findStack.idEnvelope)
            }
            return true
        } else{
            return false
        }
    }
}

const weiClinic = new WeiClinic()

export const getClinic = () => weiClinic
