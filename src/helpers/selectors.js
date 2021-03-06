 function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return []
  }
  const filteredDay = state.days.filter(e => e.name === day);
  if (filteredDay.length === 0) {
    return []
  }
  let selectedAppointments = [];
  filteredDay[0].appointments.map(id => selectedAppointments.push(state.appointments[id]));
  return selectedAppointments;
};

const getInterview= (state, interview) => {
  return interview === null ? null : {
      "student":interview.student,
      'interviewer':state.interviewers[interview.interviewer]
    }
};

function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return []
  }
  const filteredDay = state.days.filter(e => e.name === day);
  if (filteredDay.length === 0) {
    return []
  }
  let selectedInterviewers = [];
  filteredDay[0].interviewers.map(id => selectedInterviewers.push(state.interviewers[id]));
  return selectedInterviewers;
};

export {getAppointmentsForDay,getInterview,getInterviewersForDay}