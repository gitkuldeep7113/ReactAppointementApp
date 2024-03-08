var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())
const DocRouter = require('./routes/doctor')
const PatientRouter = require('./routes/patient')
const AppointmentRouter = require('./routes/Appointment')
app.use(express.json());
app.use('/doctor', DocRouter)
app.use('/patient', PatientRouter)
app.use('/Appointment',AppointmentRouter)
app.listen(5000, '0.0.0.0',()=>{
    console.log('started')
});