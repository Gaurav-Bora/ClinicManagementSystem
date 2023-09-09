const express = require("express")
const db = require("../db")
const utils = require("../utils")
const cryptoJs = require('crypto-js')   //refrence from ios final project in class

const router = express.Router()
//register
router.post("/register", (request, response) => {
  const {pname,age,gender,mobile,address,email,password} = request.body

    // encrypt the password
  const encryptedPassword = String(cryptoJs.SHA256(password))
  db.query(
    "INSERT INTO patient(pname,age,gender,mobile,address,email,password) VALUES(?,?,?,?,?,?,?)",
    [pname,age,gender,mobile,address,email,encryptedPassword],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})



//login


router.post('/login', (request, response) => {
  const { email, password } = request.body

  // encrypt the password
  const encryptedPassword = String(cryptoJs.SHA256(password))

  const statement = "SELECT * FROM patient WHERE email=? and password=?"
  db.query(statement, [email, encryptedPassword], (error, patients) => {
    if (patients.length == 0) {
      // if user does not exist, users array will be empty
      response.send(utils.createResult('user does not exist'))
    } else {
      // if user exists, the users will be an array with one user entry
      const patient = patients[0]
      response.send(
        utils.createResult(null, {
          name: `${patient['pname']}`,
          age: patient['age'],
          id: patient['pid'],
          
        })
      )
    }
  })
})

//getting user by id

router.get("/:id", (request, response) => {
  const id = request.params.id
  const statement = `SELECT pname,age,gender,mobile,address,email FROM patient WHERE pid=?`
  db.query(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

//edit user info
router.put("/edit/:id",(req,resp)=>{


  const {name,age,mobile} = req.body;
  statement = "UPDATE patient set pname = ?, age = ?,  mobile = ? where user_id =?;"

  const id = request.params.id
  connect.query(statement,[name,age,mobile,id],(err,data)=>{

      resp.send(utils.createObject(err,data));
  })

})



module.exports = router