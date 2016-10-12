'use strict'

const { Database } = require('sqlite3').verbose()

const db = new Database('db/Chinook_Sqlite.sqlite')

db.serialize(() => {

    // 1. Provide a query showing Customers (just their full names, customer ID and country) who are not in the US.
    db.all(`
    SELECT FirstName || " " || LastName AS "Name",
           CustomerId,
           Country
    FROM   Customer
    WHERE  Country IS NOT "USA"
  `, (err, customers) => {
        console.log(customers)
    })

    // 2. Provide a query only showing the Customers from Brazil.

    // db.all(`
    //   SELECT FirstName || ' ' || LastName AS 'Name',
    //          CustomerId,
    //          Country
    //   FROM   Customer
    //   WHERE  Country IS 'Brazil'
    // `, (err, customers) => {
    //   customers.forEach(({ CustomerId, Name, Country }) => {
    //     console.log(`${CustomerId}: ${Name} (${Country})`)
    //   })
    // })

    db.each(`
    SELECT FirstName || " " || LastName AS "Name",
           CustomerId,
           Country
    FROM   Customer
    WHERE  Country IS "Brazil"
  `, (err, { CustomerId, Name, Country }) => {
        console.log(`${CustomerId}: ${Name} (${Country})`)
    })

    // 3. Provide a query showing the Invoices of customers who are from Brazil. The resultant table should show the customer's full name, Invoice ID, Date of the invoice and billing country.

    db.each(`
    SELECT FirstName || " " || LastName AS "Name",
           InvoiceId,
           InvoiceDate,
           BillingCountry
    FROM   Invoice
    JOIN   Customer
    ON     Invoice.CustomerId = Customer.CustomerId
    WHERE  Country = "Brazil"
  `, (err, row) => {
        console.log(row)
    })



})