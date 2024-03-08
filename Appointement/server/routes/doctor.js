const express = require ('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')

router.get('/', function (req, res) {
    const statement = `
    SELECT *
    FROM doctor
`
db.pool.query(statement, (error, notes) => {
res.send(utils.createResult(error, notes))
})
    });


    //Doctor by id
    router.get('/:id', function (req, res) {
        const {id} = req.params
        const statement = `
        SELECT Doc_ID,LastName ,FirstName ,Specialization ,Phone
        FROM doctor where Doc_ID = ?
    `
    db.pool.query(statement,[id], (error, notes) => {
    res.send(utils.createResult(error, notes))
    })
        });
//Doctor by specialization
router.get('/searchByspecs/:spec', function (req, res) {
    const {spec} = req.params
    console.log({spec})
    const statement = `
    SELECT Doc_ID,LastName ,FirstName ,Specialization ,Phone
    FROM doctor where Specialization  LIKE '%${spec}%' ;
`
db.pool.query(statement, (error, notes) => {
res.send(utils.createResult(error, notes))
})
    });

router.get('/searchBy_F_name/:fname', function (req,res){
    const {fname} = req.params
     const statement = ` SELECT Doc_ID,LastName ,FirstName ,Specialization ,Phone
     FROM doctor where FirstName  LIKE '%${fname}%' `;
     db.pool.query(statement, (error, notes) => {
        res.send(utils.createResult(error, notes))
        })

})

module.exports = router