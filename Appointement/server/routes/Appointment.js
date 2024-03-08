const express = require ('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')

router.post('/Book', function (request, response)  {
    const { appo_date,Pat_ID, Doc_ID} = request.body
  
   // const encryptedPassword = String(cryptoJs.MD5(password))
    const statement = `
      INSERT INTO appointment(appo_date,Pat_ID, Doc_id) VALUES (?, ?, ?)
    `;
    console.log(Doc_ID)
    db.pool.query(
      statement,
      [appo_date,Pat_ID, Doc_ID],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  })

  router.get('/', function (request, response)  {
    const statement = `
      select * from appointment
    `;
    db.pool.query(
      statement,(error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  })

  router.get('/form/:Pat_ID', function (request, response)  {
    const {Pat_ID} = request.params
    const statement = `
    select p.Pat_ID , p.LastName , p.FirstName , p.Phone , p.address , p.disease , p.Age , a.Appo_ID , a.Appo_date , d.LastName , d.FirstName , d.Specialization , d.Phone from patient p  JOIN appointment a ON p.Pat_ID=a.Pat_id JOIN doctor d on d.Doc_id = a.Doc_id where a.Appo_ID= ?`;
    db.pool.query(
      statement,[Pat_ID],(error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  })
  router.get('/form/:Pat_ID/:Doc_id', function (request, response)  {
    const {Pat_ID, Doc_id} = request.params
    const statement = `
    select  p.Pat_ID , p.LastName , p.FirstName , p.Phone , p.address , p.disease , p.Age , a.Appo_ID , a.Appo_date , d.D_LastName , d.D_FirstName , d.Specialization , d.D_Phone from patient p  JOIN appointment a ON p.Pat_id=a.Pat_id JOIN doctor d on d.Doc_id = a.Doc_id where a.Pat_id = ? and a.Doc_id = ? limit 1; `;
    db.pool.query(
      statement,[Pat_ID, Doc_id],(error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  })





module.exports = router