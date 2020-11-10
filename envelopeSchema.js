import Envelope from './Envelope'
import { EntitySchema } from 'typeorm'

export const envelopeSchema = new EntitySchema({
    tableName: 'table_envelope',
    name: 'envelopeData',
    target: Envelope,
    columns:{
        id: {
            primary: true,
            generated: true,
            type: 'int'
        },
        gender: {
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
