const express = require("express")
const db = require("../db")
const utils = require("../utils")

const router = express.Router()


//post medical prescription by doctor

router.post("/addMedicalRecord", (request, response) => {
    const {aid,prescription} = request.body  
    
    db.query(
      "INSERT INTO medical_record(aid,prescription) VALUES(?,?)",
      [aid,prescription],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  })


  // Route to get pname, date, name, and prescription by pid
router.get('/medicalRecords/:pid', (req, res) => {
  const pid = req.params.pid;

  const query = `
    SELECT
      p.pname,
      a.date,
      d.name,
      mr.prescription
    FROM
      appointment a
      JOIN patient p ON a.pid = p.pid
      JOIN doctor d ON a.did = d.did
      JOIN medical_record mr ON a.aid = mr.aid
    WHERE
      p.pid = ?;
  `;

  db.query(query, [pid], (error, results) => {
    if (error) {
      console.error('Error fetching medical records:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Send the results back to the client
    res.status(200).json(results);
  });
});


module.exports = router