import React from 'react'
import './style.css';

const About = () => {
  return (
    <div>
    <div >
          <div className="card text-bg-transparent mb-7 text-primary-emphasis">
           <div className="card-footer position-absolute top-0 start-50 translate-middle-x p-3"><h2>About Health-Clinic</h2></div>
             <div className="card-body col-sm-2 col-md-12 About"> 
              <p className='card-text d-flex vh-100 justify-content-centre align-items-center bg-transparent'>
                 </p>
                 <p className='card text-bg-secondary expand-lg  mb-7'><h6>Welcome to the Health-Clinic!</h6>
                  your comprehensive solution for efficient and organized healthcare administration. 
                  Our system is designed to simplify clinic operations, enhance patient care, 
                  and empower healthcare professionals to focus on what truly matters – providing top-notch medical services.
                  <h6>Our Mission</h6>
                  At Clinic Management System, 
                  our mission is to revolutionize the way clinics operate by providing a feature-rich, 
                  user-friendly, and secure platform. 
                  We aim to streamline administrative tasks, 
                  improve patient engagement,and facilitate seamless communication among clinic staff, doctors, and patients.
                  <h6>Key Features</h6>
                  <h6>Appointment Management</h6>
                  Our system enables patients to conveniently schedule appointments online, 
                  eliminating the need for phone calls and reducing wait times. 
                  Clinic staff can efficiently manage appointments,view availability,and send automated reminders to patients.
                  <h6>Patient Records and Electronic Health Records (EHR)</h6>
                   Effortlessly maintain digital patient records, including medical history, prescriptions, lab reports, and treatment plans. 
                   Our electronic health records (EHR) system ensures accurate and secure data storage, simplifying patient care coordination.
              </p>
           
              </div>
              </div>
            </div>
       </div>

  );
};

export default About;
