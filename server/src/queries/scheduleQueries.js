const getSchedules = 'SELECT * FROM schedule';
const getScheduleById = 'SELECT * FROM schedule WHERE id =  $1';
const getAvailableSchedules = 'SELECT * FROM schedule WHERE available =  true';
const getNewSchedule = 'SELECT * FROM schedule WHERE day_and_time = $1 AND professional_id =  $2';
const createSchedule = 'INSERT INTO schedule (day_and_time, professional_id, client_id, service_id, "created at", available) VALUES ($1, $2, $3, $4, $5, $6)';
const checkIfScheduleExists = 'SELECT * FROM schedule WHERE day_and_time =  $1 AND professional_id =  $2';
const checkIfClientScheduleExists = 'SELECT * FROM schedule WHERE day_and_time =  $1 AND client_id =  $2';
const checkIfDayAndTimeExists = 'SELECT * FROM schedule WHERE day_and_time =  $1';
const checkIfScheduleConflict = 'SELECT * FROM schedule WHERE professional_id =  $1';
const checkClientId = 'SELECT * FROM schedule WHERE client_id =  $1';
const updateSchedule = 'UPDATE schedule SET day_and_time = $1, professional_id = $2, client_id = $3, service_id = $4, available = $5 WHERE id = $6';
const deleteSchedule = 'DELETE FROM schedule WHERE id = $1';

module.exports = {
  getSchedules,
  getScheduleById,
  createSchedule,
  getNewSchedule,
  updateSchedule,
  deleteSchedule,
  checkIfScheduleExists,
  checkIfDayAndTimeExists,
  checkIfScheduleConflict,
  checkClientId,
  checkIfClientScheduleExists,
  getAvailableSchedules,
};
