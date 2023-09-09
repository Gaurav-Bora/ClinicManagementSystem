const express = require("express");
const db = require("../db");
const utils = require("../utils");
 //refrence from ios final project in class

const router = express.Router();

router.post("/login", (request, response) => {
  const { email, password } = request.body;

  // encrypt the password

  const statement = "SELECT * FROM doctor WHERE email=? and password=?";
  db.query(statement, [email, password], (error, doctors) => {
    if (doctors.length == 0) {
      // if user does not exist, users array will be empty
      response.send(utils.createResult("user does not exist"));
    } else {
      // if user exists, the users will be an array with one user entry
      const doctor = doctors[0];
      response.send(
        utils.createResult(null, {
          name: `${doctor["name"]}`,
          speacialist: doctor["speacialist"],
          id: doctor["did"],
        })
      );
    }
  });
});

//get all doctor

router.get("/allDoctors", (request, response) => {
  const statement = `SELECT did,speacialist FROM doctor`;
  db.query(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
