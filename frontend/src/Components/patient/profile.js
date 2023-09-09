import React, { useEffect, useState } from 'react';
import { patientProfileApi } from '../../services/patient';
import { toast } from 'react-toastify';

function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getPatientProfile();
  }, []);

  const getPatientProfile = async () => {
    try {
      const response = await patientProfileApi();
      if (response && response.data.length > 0) {
        setProfile(response.data[0]);
      } else {
        toast.error('Error while fetching patient profile');
      }
    } catch (error) {
      console.error('Error fetching patient profile:', error);
      toast.error('An error occurred while fetching patient profile');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Profile Page</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Name: {profile.pname}</h5>
          <p className="card-text">Age: {profile.age}</p>
          <p className="card-text">Gender: {profile.gender}</p>
          <p className="card-text">Mobile: {profile.mobile}</p>
          <p className="card-text">Address: {profile.address}</p>
          <p className="card-text">Email: {profile.email}</p>
          {/* Add more user information as needed */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
