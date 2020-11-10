import CorticalStack from './corticalStack'
import { EntitySchema } from 'typeorm'

export const envelopeSchema = new EntitySchema({
    tableName: 'CorticalStacks',
    name: 'corticalStackData',
    target: CorticalStack,
    columns:{
        id: {
            primary: true,
            generated: true,
            type: 'int'
        },
        realGender: {
            type: 'varchar',
            nullable: false
        },
        name: {
            type: 'varchar',
            nullable: false
        },
        age: {
            type: 'int',
            nullable: false
        },
        idStack: {
            type: 'int',
            nullable: true
        }
    }
})
