import { useEffect, useState } from "react";
import axios from 'axios';


export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{},
  });
  const setDay = day => setState({ ...state, day });
  const setAppointments = appointments => setState({...state, appointments});

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //setAppointments(appointments)------>Optimistic
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(setAppointments(appointments))//--------->Pessimistic
  };

  const cancelInterview = (id) => {
 
    const appointments = state.appointments;

    appointments.id = null;

    //setAppointments(appointments)------>Optimistic
    return axios.delete(`/api/appointments/${id}`)
    .then(setAppointments(appointments))//--------->Pessimistic
  };
  useEffect(() =>{
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments:all[1].data,
        interviewers: all[2].data 
      }));
    });
  },[]);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}