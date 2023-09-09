import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../../features/authSlice'
import { loginDoctor as loginDoctorApi } from '../../services/doctor'
import 'bootstrap/dist/css/bootstrap.min.css';


function LoginDoctor() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // get the navigation object
  const navigate = useNavigate()

  // get dispatcher object
  const dispatch = useDispatch()

  const loginDoctor = async () => {
    if (email.length === '') {
      toast.error('Please enter email')
    } else if (password.length === '') {
      toast.error('Please enter password')
    } else {
      // call register api
      const response = await loginDoctorApi(email, password)

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

        toast.success(`Welcome Dr. ${name} to Appointments of Health Clinic`)

        // go back to login
        navigate('/doctor-appointments')
      } else {
        toast.error('Invalid user name or password')
      }
    }
  }

  return (
    <div>
       
           
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Login</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3 '>
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
              
              <button onClick={loginDoctor} className='btn btn-success'>
                Login
              </button>

            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
    </div>
  )
}

export default LoginDoctor