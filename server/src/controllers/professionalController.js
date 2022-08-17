/* eslint-disable camelcase */
const pool = require('../database/postgreSQLconfig');
const queries = require('../queries/professionalQueries');

const getProfessionals = async (req, res) => {
  try {
    const findProfessionals = await pool.query(queries.getProfessionals);

    if (findProfessionals.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find any professionals',
        details: 'Not found',
      });
    }
    return res.status(200).json(findProfessionals.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProfessionalById = async (req, res) => {
  const { id } = req.params;
  try {
    const findProfessional = await pool.query(queries.getProfessionalById, [id]);

    if (findProfessional.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this Professional',
        details: 'Not found',
      });
    }
    return res.status(200).json(findProfessional.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createProfessional = async (req, res) => {
  const {
    name, username, email, password, CPF, date_of_birth, unit_id,
  } = req.body;
  try {
    const checkIfUsernameExists = await pool.query(queries.checkIfUsernameExists, [username]);
    const checkIfEmailExists = await pool.query(queries.checkIfEmailExists, [email]);
    const checkCPF = await pool.query(queries.checkCPF, [CPF]);

    if (checkIfUsernameExists.rowCount || checkIfEmailExists.rowCount || checkCPF.rowCount) {
      return res.status(409).json({
        message: 'The registration of a new Professional have failed',
        details: 'Conflict',
      });
    }

    const createdAt = new Date();
    await pool.query(
      queries.createProfessional,
      [name, username, email, password, CPF, date_of_birth, unit_id, createdAt],
    );
    let getNewProfessional = await pool.query(queries.getNewProfessional, [email]);
    getNewProfessional = getNewProfessional.rows;

    return res.status(201).json({
      message: 'Professional successfully created!',
      getNewProfessional,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfessional = async (req, res) => {
  const { id } = req.params;
  let {
    name, username, email, password, CPF, date_of_birth, unit_id,
  } = req.body;

  try {
    const checkIfUsernameExists = await pool.query(queries.checkIfUsernameExists, [username]);
    const checkIfEmailExists = await pool.query(queries.checkIfEmailExists, [email]);

    if (checkIfUsernameExists.rowCount || checkIfEmailExists.rowCount) {
      return res.status(409).json({
        message: 'The registration of a new Professional have failed',
        details: 'Conflict',
      });
    }
    const findProfessional = await pool.query(queries.getProfessionalById, [id]);
    const ProfessionalFound = findProfessional.rows;
    const ProfessionalItems = ProfessionalFound.find((item) => item);

    name = name || ProfessionalItems.name;
    username = username || ProfessionalItems.username;
    email = email || ProfessionalItems.email;
    password = password || ProfessionalItems.password;
    CPF = CPF || ProfessionalItems.CPF;
    date_of_birth = date_of_birth || ProfessionalItems.date_of_birth;
    unit_id = unit_id || ProfessionalItems.unit_id;

    if (findProfessional.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this Professional',
        details: 'Not found',
      });
    }

    await pool.query(
      queries.updateProfessional,
      [name, username, email, password, CPF, date_of_birth, unit_id, id],
    );
    return res.status(200).json({
      message: 'Professional successfully updated!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProfessional = async (req, res) => {
  const { id } = req.params;
  try {
    const findProfessional = await pool.query(queries.getProfessionalById, [id]);

    if (findProfessional.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this Professional',
        details: 'Not found',
      });
    }
    await pool.query(queries.deleteProfessional, [id]);
    return res.status(200).json({
      message: 'Professional successfully deleted!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfessionals,
  getProfessionalById,
  createProfessional,
  updateProfessional,
  deleteProfessional,
};
