import axios from 'axios'
import { createUrl, log } from '../utils/utils'


  

  


export async function loginDoctor(email, password) {
  const url = createUrl('/doctor/login')
  const body = {
    email,
    password,
  }

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url, body)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}


//get doctors appointment by did

export async function getAppointmentsList() {
  const { id } = sessionStorage
  const url = createUrl('/appointment/doctor/' + id);

  try {
    // get the current user's token from session storage
    const { token } = sessionStorage

    // create a header to send the token
    const header = {
      headers: {
        token,
      },
    }

    // make the api call using the token in the header
    const response = await axios.get(url, header)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}

  //api to delete apointment
  export async function deleteAppointmentById(aid) {
    const url = createUrl(`/appointment/deletePatient/${aid}`);
    
    try {
      const response = await axios.delete(url);
      console.log(response.data); // Logging the response data
      return response.data;
    } catch (error) {
      console.error(error); // Logging the error
      return null;
    }
  }

  //api to assign time and accept appointment
  export async function updateTime(updatedTime,aid) {
    const url = createUrl(`/appointment/acceptAppointment/${aid}`);
    
    try {
      const response = await axios.put(url, { newTime: updatedTime });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  //give prescription to the patient

  export async function addPrescription(
    aid,
    prescription
) {
  const url = createUrl('/records/addMedicalRecord')
  const body = {
    aid,
    prescription,
  }

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url, body)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}