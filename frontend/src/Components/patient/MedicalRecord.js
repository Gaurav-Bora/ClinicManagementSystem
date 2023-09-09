// MedicalRecord.js

import React, { useEffect, useState } from 'react';
import { getMedicalRecordApi } from '../../services/patient';
import { toast } from "react-toastify";

function MedicalRecord() {
  var [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    getMedicalRecord();
  }, []);

  const getMedicalRecord = async () => {
    const response = await getMedicalRecordApi();
    if (Array.isArray(response)) {
      setMedicalRecords(response);
    } else {
      toast.error("Error while calling get /medicalRecord status api");
    }
  };
  

  return (
    <div>
      <h1>Medical Record</h1>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Appointment Date</th>
              <th>Doctor Name</th>
              <th>Prescription</th>
            </tr>
          </thead>
          <tbody>
            {medicalRecords.map((medicalRecord, index) => (
              <tr key={index}>
                <td>{medicalRecord["pname"]}</td>
                <td>{medicalRecord["date"]}</td>
                <td>{medicalRecord["name"]}</td>
                <td>{medicalRecord["prescription"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicalRecord;
