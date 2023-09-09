import React from 'react'

import { useEffect, useState } from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.css";

import { toast } from "react-toastify";
// import EditAppointment from "../../services/EditAppointment";
import {
  getAppointmentsList,
  deleteAppointmentById,
  updateTime,
} from "../../services/doctor";
import EditAppointment from './EditAppointment';
import { Link } from 'react-router-dom';


function DoctorsAppointment() {
  var [appointments, setAppointments] = useState([]);
  var [message, setMessage] = useState("");
  var [appointment, setAppointment] = useState({ aid: 0, date: "", time: "" }); //#
  var [operation, setOpration] = useState("");
  var [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);
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
  const loadAppointments = async () => {
    const response = await getAppointmentsList();
    if (response["status"] === "success") {
      setAppointments(response["data"]);
    } else {
      toast.error("Error while calling get /product api");
    }
  };

  var Select = function (aid) {
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState == 4 && helper.status == 200) {
        var result = JSON.parse(helper.responseText);
        setAppointments(result);
      }
    };
    helper.open(
      "GET",
      `http://localhost:5000/appointment/acceptAppointment/${aid}`
    );
    helper.send();
  };

  var ShowMessage = function (msg) {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  var TextChanged = function (args) {
    debugger;
    var copyOfAppointment = { ...appointment };
    copyOfAppointment[args.target.name] = args.target.value;
    setAppointment(copyOfAppointment);
  };

  var Edit = function (aid) {
    for (var i = 0; i < appointments.length; i++) {
      if (appointments[i].aid == aid) {
        var copyOfAppointment = { ...appointments[i] };
        setAppointment(copyOfAppointment);
        setOpration("edit");
        break;
      }
    }
  };

  var Update = function () {
    //Here this.state.emp will have updated record.
    //use this to send data using Put request to the server

    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState == 4 && helper.status == 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        if (result.affectedRows > 0) {
          setMessage("Record Updated successfully!!");

          Select();

          setAppointment({ aid: 0, date: "", time: "" }); //#
        }
      }
    };

    debugger;
    helper.open("PUT", "http://localhost:5000/appointment/acceptAppointment/" + appointment.aid);

    helper.setRequestHeader("Content-Type", "application/json");

    var dataToBePassedInStringFormat = JSON.stringify(appointment);
    helper.send(dataToBePassedInStringFormat);
  };

  var CancelUpdate = function () {
    setOpration("");
    setAppointment({ aid: 0, date: "", time: "" }); //#
  };

  var Search = function (args) {
    console.log("U searched " + args.target.value);
    setSearchText(args.target.value);
  };

  return (
    <>
      <center>
        <EditAppointment
          appointment={appointment}
          TextChanged={TextChanged}
          Update={Update}
          CancelUpdate={CancelUpdate}
        />
        <h3 className="alert alert-success">{message}</h3>
        
        <br />
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Mobile</th>
                <th>Doctors Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Symptoms</th>
                <th>Delete</th>
                <th>Appointment Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => {
                if (searchText == "") {
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

                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            Edit(appointment.aid);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <Link to='/add-prescription'>
                          <button
                            className="btn btn-info"
                            
                          >
                            Add Prescription
                          </button></Link>
                        </td>
                    </tr>
                  );
                } else {
                  if (
                    appointment.EAddress.toLowerCase().includes(
                      searchText.toLocaleLowerCase()
                    )
                  ) {
                    return (
                      <tr>
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
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => {
                              Edit(appointment["aid"]);
                            }}
                          >
                            Edit
                          </button>
                          
                        </td>
                        
                      </tr>
                    );
                  }
                }
              })}
            </tbody>
          </table>
        </div>
      </center>
    </>
  );
}



export default DoctorsAppointment
