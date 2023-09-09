import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'





// used to register react-toastify
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login } from './features/authSlice'
import NavigationBar from './Components/patient/navigationBar'

import RegisterPatient from './Components/patient/registerPatient'
import LoginPatient from './Components/patient/loginPatient'
import HomePage from './Components/patient/HomePage'
import Contact from './Components/patient/Contact'
import About from './Components/patient/About'
import LoginDoctor from './Components/doctor/loginDoctor'
import DoctorsAppointment from './Components/doctor/DoctorsAppointment'
import PatientAppointment from './Components/patient/patientAppointment'
import AppointmentStatus from './Components/patient/AppointmentStatus'
import Profile from './Components/patient/profile'
import MedicalRecord from './Components/patient/MedicalRecord'
import AddPriscription from './Components/doctor/addPriscription'


function App() {
  // use selector accepts a function which passes the store global state
  // at the moment we are interested only in auth slice
  const loginStatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()

  useEffect(() => {
    // first read the current sessionStorage and see if user is logged in
    if (sessionStorage['token'] && sessionStorage['token'].length > 0) {
      // update the auth slice status to true
      dispatch(login())
    }
  }, [])

  return (
    <div className='container-fluid'>
      {/* navigation bar here */}
      {/* conditional rendering */}
      {loginStatus && <NavigationBar />}
      <div >
        <Routes>
          {/* home component  */}
          <Route path='/home' element={<HomePage />}/>

         
          

          {/* login component */}
          <Route path='/' element={<LoginPatient />} />
        

          {/* register component */}
          <Route path='/register' element={<RegisterPatient />} />

          {/* profile component */}
          <Route path='/profile' element={<Profile />} />

          {/* Medical record component */}
          <Route path='/medical-record' element={<MedicalRecord />} />

          {/* contact component */}
          <Route path='/contact' element={<Contact />} />

          {/* about component */}
          <Route path='/about' element={<About />} />

          {/* doctorLogin component */}
          <Route path='/doctor-login' element={<LoginDoctor />} />

          {/* DoctorsAppointment component */}
          <Route path='/doctor-appointments' element={<DoctorsAppointment />} />

          {/* patientAppointment component */}
          <Route path='/patient-appointment' element={<PatientAppointment />} />


          <Route path='/appointment-status' element={<AppointmentStatus />} />

          {/* addPrescription */}
          <Route path='/add-prescription' element={<AddPriscription />} />



          

          

          
        </Routes>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
