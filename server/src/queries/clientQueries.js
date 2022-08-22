const getClients = 'SELECT * FROM client';
const getClientById = 'SELECT * FROM client WHERE id =  $1';
const getNewClient = 'SELECT * FROM client WHERE email =  $1';
const checkCPF = 'SELECT * FROM client WHERE "CPF" =  $1';
const createClient = 'INSERT INTO client (name, username, email, password, "CPF", date_of_birth, "created at") VALUES ($1, $2, $3, $4, $5, $6, $7)';
const checkIfUsernameExists = 'SELECT c FROM client c WHERE c.username =  $1';
const checkIfEmailExists = 'SELECT c FROM client c WHERE c.email =  $1';
const updateClient = 'UPDATE client SET name = $1, username  = $2, email  = $3, password  = $4, "CPF" = $5, date_of_birth = $6 WHERE id = $7';
const updatePassword = 'UPDATE client SET password  = $1 WHERE email = $2';
const deleteClient = 'DELETE FROM client WHERE id = $1';

module.exports = {
  getClients,
  getClientById,
  createClient,
  getNewClient,
  updateClient,
  updatePassword,
  deleteClient,
  checkIfUsernameExists,
  checkIfEmailExists,
  checkCPF,
};
