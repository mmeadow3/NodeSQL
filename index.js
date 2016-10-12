'use strict'

const { Database } = require('sqlite3').verbose()

const db = new Database('db/Chinook_Sqlite.sqlite')

db.serialize(() => {
        db.all(`
    SELECT Customer.FirstName || ' ' || Customer.LastName AS 'Name',
           Customer.CustomerId,
           Customer.Country
    FROM   Customer
    WHERE  Customer.Country IS NOT 'USA'
  `, (err, customers) => {
            console.log(customers)
        })
    })
    ////////////if we run "node index.js" we get returned an array of objects
db.close()