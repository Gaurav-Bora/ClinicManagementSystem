import { useState } from "react";
import { toast } from 'react-toastify'
import { addPrescription as addPrescriptionApi } from "../../services/doctor";
import { useNavigate } from "react-router-dom";

function AddPriscription() {
  const [aid, setAid] = useState("");
  const [prescription, setPrescription] = useState("");
  const navigate = useNavigate()

  const addPrescription = async () => {
    if (aid === '') {
      toast.error('Please enter Appointment ID');
    } else if (prescription === '') {
      toast.error('Please enter Prescription');
    } else {
      try {
        // Call the addPrescriptionApi function with aid and prescription
        const response = await addPrescriptionApi(aid, prescription);

        if (response['status'] === 'success') {
          toast.success('Successfully added Prescription');
          navigate('/doctor-appointments');
        } else {
          toast.error('Error while giving prescription');
        }
      } catch (error) {
        console.error('Error adding prescription:', error);
        toast.error('An error occurred while adding prescription');
      }
    }
  }

  return <div>
    <div className="container mt-5">
      <h2>Add Prescription</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="aid" className="form-label">
            Appointment ID
          </label>
          <input
            type="number"
            className="form-control"
            id="aid"
            value={aid}
            onChange={(e) => setAid(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prescription" className="form-label">
            Prescription
          </label>
          <textarea
            className="form-control"
            id="prescription"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={addPrescription}
        >
          Add Prescription
        </button>
      </form>
    </div>
  



  </div>;
}

export default AddPriscription;
