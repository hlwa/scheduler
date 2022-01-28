import { useEffect, useState } from "react";
import axios from 'axios';


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{},
  });

  const setDay = day => setState({ ...state, day });
  
  const getSpotsForDay = (day,appointments) =>{
    let spots = 0;

    for (const id of day.appointments) {
      const appointment = appointments[id];
      if(!appointment.interview) {
        spots ++
      }
    }
    return spots;
  };

  const updateSpots = (state,appointments,id) => {
   const dayObj = state.days.find(day => day.name === state.day);
   const spots =getSpotsForDay(dayObj,appointments);
   return  state.days.map(d=>d.name === state.day ? {...dayObj, spots} : d);
  };

  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state,appointments,id);
    
    return axios.put(`/api/appointments/${id}`, {interview})
                .then(setState({...state,appointments,days}))
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const foundDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day, index) => {
      if (day.name === foundDay.name) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
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