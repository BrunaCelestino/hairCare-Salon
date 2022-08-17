const getProfessionals = 'SELECT * FROM professional';
const getProfessionalById = 'SELECT * FROM professional WHERE id =  $1';
const checkCPF = 'SELECT * FROM professional WHERE "CPF" =  $1';
const getNewProfessional = 'SELECT * FROM professional WHERE email =  $1';
const createProfessional = 'INSERT INTO professional (name, username, email, password, "CPF", date_of_birth, unit_id, "created at") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
const checkIfUsernameExists = 'SELECT p FROM professional p WHERE p.username =  $1';
const checkIfEmailExists = 'SELECT p FROM professional p WHERE p.email =  $1';
const updateProfessional = 'UPDATE professional SET name = $1, username  = $2, email  = $3, password  = $4, "CPF" = $5, date_of_birth = $6, unit_id = $7 WHERE id = $8';
const deleteProfessional = 'DELETE FROM professional WHERE id = $1';

module.exports = {
  getProfessionals,
  getProfessionalById,
  createProfessional,
  getNewProfessional,
  updateProfessional,
  deleteProfessional,
  checkIfUsernameExists,
  checkIfEmailExists,
  checkCPF,
};
