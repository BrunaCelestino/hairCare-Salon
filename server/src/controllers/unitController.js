/* eslint-disable camelcase */
const pool = require('../database/postgreSQLconfig');
const queries = require('../queries/unitQueries');

const getUnits = async (req, res) => {
  try {
    const findUnits = await pool.query(queries.getUnits);

    if (findUnits.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find any units',
        details: 'Not found',
      });
    }
    return res.status(200).json(findUnits.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUnitById = async (req, res) => {
  const { id } = req.params;
  try {
    const findUnit = await pool.query(queries.getUnitById, [id]);

    if (findUnit.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this unit',
        details: 'Not found',
      });
    }
    return res.status(200).json(findUnit.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createUnit = async (req, res) => {
  const {
    name, CNPJ, adress,
  } = req.body;
  try {
    const checkIfUnitExists = await pool.query(queries.checkIfUnitExists, [name]);
    const checkCNPJ = await pool.query(queries.checkCNPJ, [CNPJ]);
    const checkAdress = await pool.query(queries.checkAdress, [adress]);
    if (checkIfUnitExists.rowCount || checkCNPJ.rowCount || checkAdress.rowCount) {
      return res.status(409).json({
        message: 'The registration of a new unit have failed',
        details: 'Conflict',
      });
    }

    const createdAt = new Date();
    await pool.query(
      queries.createUnit,
      [name, CNPJ, adress, createdAt],
    );
    let getNewUnit = await pool.query(queries.getNewUnit, [name]);
    getNewUnit = getNewUnit.rows;

    return res.status(201).json({
      message: 'Unit successfully created!',
      getNewUnit,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUnit = async (req, res) => {
  const { id } = req.params;
  let {
    name, CNPJ, adress,
  } = req.body;

  try {
    const checkIfUnitExists = await pool.query(queries.checkIfUnitExists, [name]);
    const checkCNPJ = await pool.query(queries.checkCNPJ, [CNPJ]);
    const checkAdress = await pool.query(queries.checkAdress, [adress]);
    if (checkIfUnitExists.rowCount || checkCNPJ.rowCount || checkAdress.rowCount) {
      return res.status(409).json({
        message: 'The unit update have failed',
        details: 'Conflict',
      });
    }
    const findUnit = await pool.query(queries.getUnitById, [id]);
    const unitFound = findUnit.rows;
    const unitItems = unitFound.find((item) => item);

    name = name || unitItems.name;
    CNPJ = CNPJ || unitItems.CNPJ;
    adress = adress || unitItems.adress;

    if (findUnit.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this unit',
        details: 'Not found',
      });
    }

    await pool.query(
      queries.updateUnit,
      [name, CNPJ, adress, id],
    );
    return res.status(200).json({
      message: 'Unit successfully updated!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUnit = async (req, res) => {
  const { id } = req.params;
  try {
    const findUnit = await pool.query(queries.getUnitById, [id]);

    if (findUnit.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this unit',
        details: 'Not found',
      });
    }
    await pool.query(queries.deleteUnit, [id]);
    return res.status(200).json({
      message: 'Unit successfully deleted!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
};
