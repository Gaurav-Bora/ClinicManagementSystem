function EditAppointment(props)
{
        return (<>
                 <table>
                    <tbody>
                        <tr>
                            <td>Appointment ID</td>
                            <td>
                                <input type="number" 
                                        name="aid"
                                        value={props.appointment.aid}
                                        onChange={props.TextChanged}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>
                                <input type="text" 
                                        name="date"
                                        value={props.appointment.date}onChange={props.TextChanged}/>
                            </td>
                        </tr>

                        <tr>
                            <td>Time</td>
                            <td>
                                <input type="text" 
                                        name="time"
                                        value={props.appointment.time}onChange={props.TextChanged}/>
                            </td>
                        </tr>

                        

                                                                  

                        <tr>
                            
                            <td style={{padding: 10}}>
                                
                                <button className='btn btn-warning' onClick={props.Update}>
                                    Update Appointment
                                </button>
                                {"    "}
                                <button className='btn btn-warning' onClick={props.CancelUpdate}>
                                    Cancel Record Update
                                </button>
                            </td>
                        </tr>
                    </tbody>
                 </table>
                </>);
}

 
export default EditAppointment;