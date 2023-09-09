import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../../features/authSlice'
import { loginPatient as loginPatientApi } from '../../services/patient'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginDoctor from '../doctor/loginDoctor'
import './style.css';

function LoginPatient() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // get the navigation object
  const navigate = useNavigate()

  // get dispatcher object
  const dispatch = useDispatch()

  const loginUser = async () => {
    if (email.length == '') {
      toast.error('Please enter email')
    } else if (password.length == '') {
      toast.error('Please enter password')
    } else {
      // call register api
      const response = await loginPatientApi(email, password)

      // parse the response
      if (response['status'] === 'success') {
        // parse the response's data and extract the token
        const { token, name, id} = response['data']

        // store the token for making other apis
        sessionStorage['token'] = token
        sessionStorage['name'] = name
        sessionStorage['id'] = id
        

        // update global store's authSlice with status = true
        dispatch(login())

        toast.success(`Welcome ${name} to Health Clinic`)

        // go back to login
        navigate('/home')
      } else {
        toast.error('Invalid user name or password')
      }
    }
  }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-info PageBg' >
    <div className='container-fluid '>
    <a className='navbar-brand  mb-0 h1 text-primary-emphasis position-absolute top-0 start-0 p-3'>Health-Clinic</a>
         
        <div className='p-3 bg-white rounded w-25 boarder form-container border border-primary '> 
        <div className=" position-absolute top-0 end-0 p-3 ">
        <Link to="/doctor-login">Doctor's Login</Link>
        
      </div>
           
    <div>
      
      <h1 style={{ textAlign: 'center', margin: 10 }}>Login</h1>
      
      <div className='row '>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
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
            <div className='mb-0'>
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
                Don't have an account? <Link to='/register'>Register here</Link>
              </div>
              <button onClick={loginUser} className='btn btn-success'>
                Login
              </button>

            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
    </div>
    </div>
    </div> 
    
  
  )
}

export default LoginPatient
