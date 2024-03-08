const express = require ('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')

//get all user
router.get('/', function(req,res){
const statement =`select * from patient`;
db.pool.query(statement,(error,patients)=>{
    res.send(utils.createResult(error,patients))
})

})


//get all user by id
router.get('/:id', function (req, res) {
    const {id} = req.params
    const statement = `
    SELECT Pat_ID,LastName ,FirstName ,email,Phone,address,disease,age
    FROM patient where Pat_ID = ?
`
db.pool.query(statement,[id], (error, notes) => {
res.send(utils.createResult(error, notes))
})
    });

    router.get('/signin/:email/:password', function (req, res) {
        const {email, password} = req.params
       
        const statement = `
        SELECT Pat_ID,LastName ,FirstName ,email,Phone,address,disease,age
        FROM patient where Email  = ? and Password = ? 
    `
    
    db.pool.query(statement,[email,password], (error, notes) => {
    res.send(utils.createResult(error, notes))
    })
        });
    

    //get all user by age
    router.get('/ByAge/:Age', function (req, res) {
        const {Age} = req.params
        const statement = `
        SELECT Pat_ID,LastName ,FirstName ,email,Phone,address,disease,age
        FROM patient where Age = ?
    `
    db.pool.query(statement,[Age], (error, notes) => {
    res.send(utils.createResult(error, notes))
    })
        });

        router.post('/register',function (req, res) {
            const {LastName,FirstName,email,Password,Phone,address,disease,age} = req.body
            const statement = `
            insert into patient (LastName,FirstName,Email,Password,Phone,address,disease,Age) 
            values (?,?,?,?,?,?,?,?);
        `
        db.pool.query(statement,[LastName ,FirstName ,email,Password,Phone,address,disease,age], (error, notes) => {
        res.send(utils.createResult(error, notes))
        })
            });

//get all user by name
    router.get('/byName/:name', function (req, res) {
        const {name} = req.params
        const statement = `SELECT Pat_ID,LastName ,FirstName ,email,Phone,address,disease,age
        FROM patient where FirstName like '%${name}%' `;
    db.pool.query(statement,(error, notes) => {
    res.send(utils.createResult(error, notes))
    })
        });

        //get all user by disease
        router.get('/byDiseaseName/:disease', function (req, res) {
            const {disease} = req.params
            const statement = `SELECT Pat_ID,LastName ,FirstName ,email,Phone,address,disease,age
            FROM patient where disease like '%${disease}%' `;
        db.pool.query(statement,(error, notes) => {
        res.send(utils.createResult(error, notes))
        })
            });


module.exports = router

//insert into patient (LastName,FirstName,Email,Password,Phone,address,disease,Age) values ("jadhav","guddu","g@gmail.com","1293","743233289","fdsv jh  DGSYHWD","Pimples",21);