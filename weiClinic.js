import CorticalStack from './corticalStack'
import Envelope from './Envelope'
import mysql from 'mysql2/promise'

class WeiClinic {
    async connect() {
        try {
          return await mysql.createConnection({
            host: '0.0.0.0',
            user: 'root',
            password: 'root',
            port: '3306',
            database: 'db_alteredCarbon'
          })
        } catch (err) {
          console.error('Unable to connect')
          throw err
        }
      }

    async create(realGender, name, age) {
        const connection = await this.connect()

       try {
           const newEnvelope = new Envelope(realGender, age)
           const newCorticalStack = new CorticalStack(realGender, name, age)
           const [result1] = await connection.query(
            `INSERT INTO Envelopes (gender, age) VALUES ('${realGender}', '${age}')`
           )
           const [result2] = await connection.query(
            `INSERT INTO CorticalStacks (realGender, name, age) VALUES ('${realGender}', '${name}', '${age}')`
           )

           newEnvelope.id = result1.insertId
           newCorticalStack.id = result2.insertId
           newEnvelope.idStack = newCorticalStack.id
           newCorticalStack.idEnvelope = newEnvelope.id
           return [newEnvelope , newCorticalStack]
       }catch (err) {
        console.error(err.message)
      } finally {
        connection.end()
      }
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
