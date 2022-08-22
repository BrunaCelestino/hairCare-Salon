/* eslint-disable camelcase */
const pool = require('../database/postgreSQLconfig');
const queries = require('../queries/clientQueries');

const getClients = async (req, res) => {
  try {
    const findClients = await pool.query(queries.getClients);

    if (findClients.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find any clients',
        details: 'Not found',
      });
    }
    return res.status(200).json(findClients.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const findClient = await pool.query(queries.getClientById, [id]);

    if (findClient.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this Client',
        details: 'Not found',
      });
    }
    return res.status(200).json(findClient.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createClient = async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    CPF,
    date_of_birth,
  } = req.body;
  try {
    const checkIfUsernameExists = await pool.query(
      queries.checkIfUsernameExists,
      [username],
    );
    const checkIfEmailExists = await pool.query(queries.checkIfEmailExists, [
      email,
    ]);

    const checkCPF = await pool.query(queries.checkCPF, [CPF]);

    if (checkIfUsernameExists.rowCount || checkIfEmailExists.rowCount || checkCPF.rowCount) {
      return res.status(409).json({
        message: 'The registration of a new Professional have failed',
        details: 'Conflict',
      });
    }

    const createdAt = new Date();
    await pool.query(queries.createClient, [
      name,
      username,
      email,
      password,
      CPF,
      date_of_birth,
      createdAt,
    ]);
    const getNewClient = await pool.query(queries.getNewClient, [email]);
    // return res.render('../views/auth/login.ejs');

    getNewClient = getNewClient.rows;
    return res.status(201).json({
      message: 'Client successfully created!',
      getNewClient,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  let {
    email,
    password,
  } = req.body;
  try {
    const findClient = await pool.query(queries.getNewClient, [email]);
    const ClientFound = findClient.rows;
    const ClientItems = ClientFound.find((item) => item);

    password = password || ClientItems.password;

    if (findClient.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this Client',
        details: 'Not found',
      });
    }

    await pool.query(queries.updatePassword, [
      password, email,
    ]);
    return res.status(200).json({
      message: 'Client successfully updated!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  let {
    name,
    username,
    email,
    password,
    CPF,
    date_of_birth,
  } = req.body;

  try {
    if (username) {
      const checkIfUsernameExists = await pool.query(
        queries.checkIfUsernameExists,
        [username],
      );

      if (checkIfUsernameExists.rowCount) {
        return res.status(409).json({
          message: 'The  Client update have failed',
          details: 'Conflict',
        });
      }
    }

    if (email) {
      const checkIfEmailExists = await pool.query(queries.checkIfEmailExists, [
        email,
      ]);

      if (checkIfEmailExists.rowCount) {
        return res.status(409).json({
          message: 'The Client update have failed',
          details: 'Conflict',
        });
      }
    }

    const findClient = await pool.query(queries.getClientById, [id]);
    const ClientFound = findClient.rows;
    const ClientItems = ClientFound.find((item) => item);

    name = name || ClientItems.name;
    username = username || ClientItems.username;
    email = email || ClientItems.email;
    password = password || ClientItems.password;
    CPF = CPF || ClientItems.CPF;
    date_of_birth = date_of_birth || ClientItems.date_of_birth;

    if (findClient.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this Client',
        details: 'Not found',
      });
    }

    await pool.query(queries.updateClient, [
      name,
      username,
      email,
      password,
      CPF,
      date_of_birth,
      id,
    ]);
    return res.status(200).json({
      message: 'Client successfully updated!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const findClient = await pool.query(queries.getClientById, [id]);

    if (findClient.rowCount === 0) {
      return res.status(404).json({
        message: 'It was not possible to find this Client',
        details: 'Not found',
      });
    }
    await pool.query(queries.deleteClient, [id]);
    return res.status(200).json({
      message: 'Client successfully deleted!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updatePassword,
  updateClient,
  deleteClient,
};
