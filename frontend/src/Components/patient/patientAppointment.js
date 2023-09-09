import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify'

function PatientAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate()
  const [symptoms, setSymptoms] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/doctor/allDoctors');
      setDoctors(response.data.data); // Access the data property in the response
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

   const handleBooking = async (event) => {
    event.preventDefault();

    const appointmentData = {
      pid: sessionStorage.getItem('id'),
      did: selectedDoctor,
      date,
      
      symptoms,
    };

    try {
      const response = await axios.post('http://localhost:5000/appointment/bookAppointment', appointmentData);
      if (response.data.status === 'success') {
        console.log('Appointment booked successfully');
        toast.success(`Appointment request successful.`)
        navigate('/appointment-status')

        // Add your success message or redirection logic here
      } else {
        console.error('Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center PageBg' >
      <div className='p-3 bg-white rounded w-25 boarder'>
      <div className='p-3 bg-white rounded w-45 boarder form-container border border-primary '> 
       
      
       
          
      <h2 style={{ textAlign: 'center', margin: 10 }}>Appointment Booking</h2>
         <form onSubmit={handleBooking}>
        <div className='mb-3 row-2'>
          <label htmlFor="doctor" className='col-sm-0 col-form-label'>Select Doctor:</label>
          <select
            id="doctor"
            onChange={(e) => setSelectedDoctor(e.target.value)}
            value={selectedDoctor}
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.did} value={doctor.did}>
                {doctor.speacialist}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className='mb-3 row'>Appointment Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="symptoms" className='col-sm-2 col-form-label'>Symptoms:</label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Book Appointment</button>
      </form>
      
    </div>
    </div>
    </div>
    
  );
}

export default PatientAppointment;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function PatientAppointment() {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [date, setDate] = useState('');
  
//   const [symptoms, setSymptoms] = useState('');

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/doctor/allDoctors');
//       setDoctors(response.data.data); // Access the data property in the response
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   const handleBooking = async (event) => {
//     event.preventDefault();

//     const appointmentData = {
//       pid: sessionStorage.getItem('id'),
//       did: selectedDoctor,
//       date,
      
//       symptoms,
//     };

//     try {
//       const response = await axios.post('http://localhost:5000/appointment/bookAppointment', appointmentData);
//       if (response.data.status === 'success') {
//         console.log('Appointment booked successfully');
//         // Add your success message or redirection logic here
//       } else {
//         console.error('Failed to book appointment');
//       }
//     } catch (error) {
//       console.error('Error booking appointment:', error);
//     }
//   };

//   return (
//     <div className='d-flex vh-100 justify-content-center align-items-center PageBg'>
//       <h2>Appointment Booking</h2>
      // <form onSubmit={handleBooking}>
      //   <div className='mb-3 row-2'>
      //     <label htmlFor="doctor">Select Doctor:</label>
      //     <select
      //       id="doctor"
      //       onChange={(e) => setSelectedDoctor(e.target.value)}
      //       value={selectedDoctor}
      //       required
      //     >
      //       <option value="">Select a doctor</option>
      //       {doctors.map((doctor) => (
      //         <option key={doctor.did} value={doctor.did}>
      //           {doctor.speacialist}
      //         </option>
      //       ))}
      //     </select>
      //   </div>

      //   <div>
      //     <label htmlFor="date">Appointment Date:</label>
      //     <input
      //       type="date"
      //       value={date}
      //       onChange={(e) => setDate(e.target.value)}
      //       required
      //     />
      //   </div>
        
      //   <div>
      //     <label htmlFor="symptoms">Symptoms:</label>
      //     <textarea
      //       id="symptoms"
      //       value={symptoms}
      //       onChange={(e) => setSymptoms(e.target.value)}
      //       required
      //     />
      //   </div>
      //   <button type="submit">Book Appointment</button>
      // </form>
//     </div>
//   );
// }

// export default PatientAppointment;
