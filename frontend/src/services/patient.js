import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function registerPatient(
    pname,
    age,
    gender,
    mobile,
    address,
    email,
    password,
) {
  const url = createUrl('/patient/register')
  const body = {
    pname,
    age,
    gender,
    mobile,
    address,
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

export async function loginPatient(email, password) {
  const url = createUrl('/patient/login')
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

//patient appointment

export async function patientAppointment(
  pid,
  did,
  date,
  symptoms,
) {
const url = createUrl('/appointment/bookAppointment')
const body = {
  pid,
  did,
  date,
  symptoms,
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


//patient appointment status

export async function getAppointmentsStatus() {
  const { id } = sessionStorage
  const url = createUrl('/appointment/patient/' + id);

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


//patient medical records

export async function getMedicalRecordApi() {
  const { id } = sessionStorage
  const url = createUrl('/records/medicalRecords/' + id);

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

//patient profile

export async function patientProfileApi() {
  const { id } = sessionStorage
  const url = createUrl('/patient/' + id);

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