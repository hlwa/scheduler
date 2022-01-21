export default function getAppointmentsForDay(state, day) {
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
}