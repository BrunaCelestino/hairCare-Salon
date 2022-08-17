/* eslint-disable camelcase */
const pool = require('../database/postgreSQLconfig');
const queries = require('../queries/scheduleQueries');

const getSchedules = async (req, res) => {
  try {
    const findSchedules = await pool.query(queries.getSchedules);

    if (findSchedules.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find any schedules',
        details: 'Not found',
      });
    }
    return res.status(200).json(findSchedules.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getScheduleById = async (req, res) => {
  const { id } = req.params;
  try {
    const findSchedule = await pool.query(queries.getScheduleById, [id]);

    if (findSchedule.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this schedule',
        details: 'Not found',
      });
    }
    return res.status(200).json(findSchedule.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAvailableSchedules = async (req, res) => {
  try {
    const findSchedule = await pool.query(queries.getAvailableSchedules);

    if (findSchedule.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find any available schedules',
        details: 'Not found',
      });
    }
    return res.status(200).json(findSchedule.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createSchedule = async (req, res) => {
  const {
    day_and_time, professional_id, client_id, service_id,
  } = req.body;
  let available;
  try {
    const checkIfScheduleExists = await pool.query(
      queries.checkIfScheduleExists,
      [day_and_time, professional_id],
    );

    const checkIfClientScheduleExists = await pool.query(
      queries.checkIfClientScheduleExists,
      [day_and_time, client_id],
    );

    if (checkIfScheduleExists.rowCount || checkIfClientScheduleExists.rowCount) {
      return res.status(409).json({
        message: 'The registration of a new Schedule have failed',
        details: 'Conflict',
      });
    }

    if (client_id) {
      available = false;
    } else {
      available = true;
    }
    const createdAt = new Date();
    await pool.query(queries.createSchedule, [
      day_and_time,
      professional_id,
      client_id,
      service_id,
      createdAt,
      available,
    ]);
    let getNewSchedule = await pool.query(queries.getNewSchedule, [
      day_and_time,
      professional_id,
    ]);
    getNewSchedule = getNewSchedule.rows;

    return res.status(201).json({
      message: 'Schedule successfully created!',
      getNewSchedule,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSchedule = async (req, res) => {
  const { id } = req.params;
  let {
    day_and_time, professional_id, client_id, service_id, available,
  } = req.body;

  try {
    const findSchedule = await pool.query(queries.getScheduleById, [id]);

    const scheduleRows = findSchedule.rows;

    if (findSchedule.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this Schedule',
        details: 'Not found',
      });
    }

    const scheduleToBeUpdated = scheduleRows.find((item) => item);

    if (day_and_time) {
      const checkIfDayAndTimeExists = await pool.query(
        queries.checkIfDayAndTimeExists,
        [day_and_time],
      );

      if (checkIfDayAndTimeExists.rowCount !== 0) {
        const scheduleFound = checkIfDayAndTimeExists.rows;

        const scheduleDayAndTimeItems = scheduleFound.find((item) => item);
        if (scheduleDayAndTimeItems.professional_id === scheduleToBeUpdated.professional_id) {
          return res.status(409).json({
            message: 'The Schedule update have failed',
            details: 'Conflict',
          });
        }

        day_and_time = day_and_time || scheduleToBeUpdated.day_and_time;
        professional_id = professional_id || scheduleToBeUpdated.professional_id;
        client_id = client_id || scheduleToBeUpdated.client_id;
        service_id = service_id || scheduleToBeUpdated.service_id;
        available = available || scheduleToBeUpdated.available;

        await pool.query(queries.updateSchedule, [
          day_and_time,
          professional_id,
          client_id,
          service_id,
          available,
          id,
        ]);

        return res.status(200).json({
          message: 'Schedule successfully updated!',
        });
      }
    }

    if (professional_id) {
      const checkIfScheduleConflict = await pool.query(
        queries.checkIfScheduleConflict,
        [professional_id],
      );

      if (checkIfScheduleConflict.rowCount !== 0) {
        const scheduleFound = checkIfScheduleConflict.rows;

        const scheduleDayAndTimeItems = scheduleFound.find((item) => item);

        if (scheduleDayAndTimeItems.day_and_time === scheduleToBeUpdated.day_and_time) {
          return res.status(409).json({
            message: 'The Schedule update have failed',
            details: 'Conflict',
          });
        }
        day_and_time = day_and_time || scheduleToBeUpdated.day_and_time;
        professional_id = professional_id || scheduleToBeUpdated.professional_id;
        client_id = client_id || scheduleToBeUpdated.client_id;
        service_id = service_id || scheduleToBeUpdated.service_id;
        available = available || scheduleToBeUpdated.available;

        await pool.query(queries.updateSchedule, [
          day_and_time,
          professional_id,
          client_id,
          service_id,
          available,
          id,
        ]);
        return res.status(200).json({
          message: 'Schedule successfully updated!',
        });
      }
    }

    if (client_id) {
      const checkIfScheduleConflict = await pool.query(
        queries.checkClientId,
        [client_id],
      );

      if (checkIfScheduleConflict.rowCount !== 0) {
        const scheduleFound = checkIfScheduleConflict.rows;

        const scheduleDayAndTimeItems = scheduleFound.find(
          (item) => item.day_and_time === scheduleToBeUpdated.day_and_time,
        );
        if (scheduleDayAndTimeItems) {
          return res.status(409).json({
            message: 'The Schedule update have failed',
            details: 'Conflict',
          });
        }
        available = false;
        day_and_time = day_and_time || scheduleToBeUpdated.day_and_time;
        professional_id = professional_id || scheduleToBeUpdated.professional_id;
        client_id = client_id || scheduleToBeUpdated.client_id;
        service_id = service_id || scheduleToBeUpdated.service_id;

        await pool.query(queries.updateSchedule, [
          day_and_time,
          professional_id,
          client_id,
          service_id,
          available,
          id,
        ]);
        return res.status(200).json({
          message: 'Schedule successfully updated!',
        });
      }
    }

    const checkIfClientScheduleExists = await pool.query(
      queries.checkIfClientScheduleExists,
      [day_and_time, client_id],
    );
    const checkIfScheduleExists = await pool.query(
      queries.checkIfScheduleExists,
      [day_and_time, professional_id],
    );

    if (checkIfScheduleExists.rowCount || checkIfClientScheduleExists.rowCount) {
      return res.status(409).json({
        message: 'The registration of a new Schedule have failed',
        details: 'Conflict',
      });
    }

    day_and_time = day_and_time || scheduleToBeUpdated.day_and_time;
    professional_id = professional_id || scheduleToBeUpdated.professional_id;
    client_id = client_id || scheduleToBeUpdated.client_id;
    service_id = service_id || scheduleToBeUpdated.service_id;
    available = available || scheduleToBeUpdated.available;

    await pool.query(queries.updateSchedule, [
      day_and_time,
      professional_id,
      client_id,
      service_id,
      available,
      id,
    ]);

    return res.status(200).json({
      message: 'Schedule successfully updated!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const findSchedule = await pool.query(queries.getScheduleById, [id]);

    if (findSchedule.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this Schedule',
        details: 'Not found',
      });
    }
    await pool.query(queries.deleteSchedule, [id]);
    return res.status(200).json({
      message: 'Schedule successfully deleted!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSchedules,
  getScheduleById,
  getAvailableSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
