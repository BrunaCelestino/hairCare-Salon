const pool = require('../database/postgreSQLconfig');
const queries = require('../queries/serviceQueries');

const getServices = async (req, res) => {
  try {
    const findServices = await pool.query(queries.getServices);

    if (findServices.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find any services',
        details: 'Not found',
      });
    }
    return res.status(200).json(findServices.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const findService = await pool.query(queries.getServiceById, [id]);

    if (findService.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this service',
        details: 'Not found',
      });
    }
    return res.status(200).json(findService.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createService = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const checkIfServiceExists = await pool.query(queries.checkIfServiceExists, [name]);

    if (checkIfServiceExists.rowCount) {
      return res.status(409).json({
        message: 'The registration of a new service have failed',
        details: 'Conflict',
      });
    }
    await pool.query(
      queries.createService,
      [name, description, price],
    );
    let getNewService = await pool.query(queries.getNewService, [name]);
    getNewService = getNewService.rows;

    return res.status(201).json({
      message: 'Service successfully created!',
      getNewService,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  let { name, description, price } = req.body;

  try {
    const checkIfServiceExists = await pool.query(queries.checkIfServiceExists, [name]);

    if (checkIfServiceExists.rowCount) {
      return res.status(409).json({
        message: 'The service update have failed',
        details: 'Conflict',
      });
    }
    const findService = await pool.query(queries.getServiceById, [id]);
    const serviceFound = findService.rows;
    const serviceItems = serviceFound.find((item) => item);

    name = name || serviceItems.name;
    description = description || serviceItems.description;
    price = price || serviceItems.price;

    if (findService.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this service',
        details: 'Not found',
      });
    }

    await pool.query(queries.updateService, [name, description, price, id]);
    return res.status(200).json({
      message: 'Service successfully updated!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const findService = await pool.query(queries.getServiceById, [id]);

    if (findService.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this service',
        details: 'Not found',
      });
    }
    await pool.query(queries.deleteService, [id]);
    return res.status(200).json({
      message: 'Service successfully deleted!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
