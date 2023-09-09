import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerPatient as registerPatientApi } from '../../services/patient'
import 'bootstrap/dist/css/bootstrap.min.css';


function RegisterPatient() {
  const [pname, setpname] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  

  // get the navigation object
  const navigate = useNavigate()

  const registerUser = async () => {
    if (pname.length == '') {
      toast.error('Please enter name')
    } else if (age.length == '') {
      toast.error('Please enter last name')
    } else if (email.length == '') {
      toast.error('Please enter email')
    } else if (mobile.length == '') {
      toast.error('Please enter mobile')
    } else if (password.length == '') {
      toast.error('Please enter password')
    }  else {
      // call register api
      const response = await registerPatientApi(
        pname,
        age,
        gender,
        mobile,
        address,
        email,
        password,
      )

      // parse the response
      if (response['status'] === 'success') {
        toast.success('Successfully registered a new user')

        // go back to login
        navigate('/')
      } else {
        toast.error('Error while registering a new user, please try again')
      }
    }
  }

  return (
    
    <div className='d-flex vh-100 justify-content-center align-items-center bg-info PageBg'>
    <div className='p-3 bg-white rounded w-25 boarder'>
    <div className='container-fluid '>
    <a className='navbar-brand  mb-0 h1 text-primary-emphasis position-absolute top-0 start-0 p-3'>Health-Clinic</a>
       
    
      <h1 style={{ textAlign: 'center', margin: 10 }}>Register User</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='md-3 '>
              <label htmlFor=''>Name</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                    setpname(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Age</label>
              <input
                type='number'
                className='form-control'
                onChange={(e) => {
                    setAge(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            
            onChange={(e) => {
                setGender(e.target.value)
              }}
            required
          >
            <option value="">Select Gender</option>
            <option value="m">Male</option>
            <option value="f">Female</option>
            <option value="n">Non-Binary</option>
          </select>
        </div>

            <div className='mb-3'>
              <label htmlFor=''>Mobile Number</label>
              <input
                type='tel'
                className='form-control'
                onChange={(e) => {
                  setMobile(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Address</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setAddress(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>

            

            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

            

            <div className='mb-3'>
              <div className='mb-3'>
                Already got an account? <Link to='/'>Login here</Link>
              </div>
              <button onClick={registerUser} className='btn btn-success'>
                Register
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default RegisterPatient
