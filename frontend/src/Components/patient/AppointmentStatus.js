import React, { useEffect, useState } from 'react'
import { getAppointmentsStatus } from '../../services/patient';
import { toast } from "react-toastify";
import {
    
    deleteAppointmentById,
    
  } from "../../services/doctor";
function AppointmentStatus() {
    var [appointments, setAppointments] = useState([]);

    useEffect(() => {
        loadAppointments();
      }, []);

    const loadAppointments = async () => {
        const response = await getAppointmentsStatus();
        if (response["status"] === "success") {
          setAppointments(response["data"]);
        } else {
          toast.error("Error while calling get /Appointment status api");
        }
      };
      const deleteAppointment = async (appointmentId) => {
        try {
          const response = await deleteAppointmentById(appointmentId);
    
          if (response.status === "success") {
            toast.success("Appointment deleted successfully");
            loadAppointments(); // Refresh the list of appointments after deletion
          } else {
            toast.error("Error while deleting appointment");
          }
        } catch (error) {
          console.error("Error while calling deleteAppointmentById:", error);
          toast.error("An error occurred while deleting appointment");
        }
      };
//pname ,age, gender, mobile ,name ,date ,a.symptoms ,a.time
  return (
    <div>
        <h1>Appointment Status</h1>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
              <th>aid</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Mobile</th>
                <th>Doctors Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Symptoms</th>
                <th>Delete</th>
                {/* <th>Appointment Time</th> */}
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => {
                 
                  return (
                    <tr key={appointment["aid"]}>
                      <td>{appointment["aid"]}</td>
                      <td>{appointment["pname"]}</td>
                      <td>{appointment["age"]}</td>
                      <td>{appointment["gender"]}</td>
                      <td>{appointment["mobile"]}</td>
                      <td>{appointment["name"]}</td>
                      <td>{appointment["date"]}</td>
                      <td>{appointment["time"]}</td>
                      <td>{appointment["symptoms"]}</td>

                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteAppointment(appointment["aid"]);
                          }}
                        >
                          Delete
                        </button>
                      </td>

                      
                    </tr>
                  );
                } 
              )}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default AppointmentStatus