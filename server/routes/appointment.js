const express = require("express")
const db = require("../db")
const utils = require("../utils")

const router = express.Router()


//posting appointment from patient side 
//here patient will not post the timing as time will be alloted by the doctor
router.post("/bookAppointment", (request, response) => {
    const {pid,did,date,symptoms} = request.body  
    
    db.query(
      "INSERT INTO appointment(pid,did,date,symptoms) VALUES(?,?,?,?)",
      [pid,did,date,symptoms],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  })
  
//patients appointment details by patient id

  router.get("/patient/:pid", (request, response) => {
    const pid = request.params.pid
    const statement = `select   aid,pname ,age, gender, mobile ,name ,date ,a.symptoms ,a.time
    from patient p inner join appointment a on
    p.pid = a.pid inner join doctor d on 
    d.did = a.did where p.pid = ?`
    db.query(statement, [pid], (error, result) => {
        response.send(utils.createResult(error, result))
      })
  })

  //patients appointment details by doctor id

  router.get("/doctor/:did", (request, response) => {
    const did = request.params.did
    const statement = `select   aid,pname ,age, gender, mobile ,name ,date ,time ,a.symptoms
    from patient p inner join appointment a on
    p.pid = a.pid inner join doctor d on 
    d.did = a.did where d.did = ?`
    db.query(statement, [did], (error, result) => {
        response.send(utils.createResult(error, result))
      })
  })

  //doctor getting all appointments

  router.get("/allAppointments", (request, response) => {
    const pid = request.params.pid
    const statement = `select   aid,pname ,age, gender, mobile ,name ,date ,time ,symptoms
    from patient p inner join appointment a on
    p.pid = a.pid inner join doctor d on 
    d.did = a.did`
    db.query(statement, [pid], (error, result) => {
        response.send(utils.createResult(error, result))
      })
  })

  //deleting appointment by appointment id

router.delete("/deletePatient/:aid", (request, response) => {
  const aid = request.params.aid
  const statement = `delete from appointment where aid=?`
  db.query(statement, [aid], (error, result) => {
      response.send(utils.createResult(error, result))
    })
})

//accepting appointment by giving user timing
// PUT route to update appointment time
router.put('/acceptAppointment/:aid', (req, res) => {
  const aid = req.params.aid;
  const time = req.body.time; // Assuming you send the new time in the request body'
  const date = req.body.date;

  const updateQuery = 'UPDATE appointment set time= ?, date = ? where aid =?;'

  db.query(updateQuery, [time, date, aid], (err, results) => {
    if (err) {
      console.error('Error updating appointment time:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    return res.status(200).json({ message: 'Appointment time updated successfully' });
  });
});



  module.exports = router