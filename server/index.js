const express = require("express")
const app = express();

const bodyParser = require("body-parser")
const routesPatient = require("./routes/patient.js")
const routesAppointments = require("./routes/appointment.js")
const routesDoctor = require("./routes/doctor.js")
const routesMedicalRecords = require("./routes/medicalRecord.js")

const cors = require("cors")
app.use(cors('*'));




app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));





app.use("/patient", routesPatient)
app.use("/appointment", routesAppointments)
app.use("/doctor", routesDoctor)
app.use("/records", routesMedicalRecords)


app.listen(5000,()=>{
    console.log("server is running on port 5000")
})

