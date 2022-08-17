const getUnits = 'SELECT * FROM unit';
const getUnitById = 'SELECT * FROM unit WHERE id =  $1';
const getNewUnit = 'SELECT * FROM unit WHERE name =  $1';
const checkCNPJ = 'SELECT * FROM unit WHERE "CNPJ" =  $1';
const checkAdress = 'SELECT * FROM unit WHERE adress = $1';
const createUnit = 'INSERT INTO unit (name, "CNPJ", adress, "created at") VALUES ($1, $2, $3, $4)';
const checkIfUnitExists = 'SELECT u FROM unit u WHERE u.name =  $1';
const updateUnit = 'UPDATE unit SET name = $1, "CNPJ" = $2, adress = $3 WHERE id = $4';
const deleteUnit = 'DELETE FROM unit WHERE id = $1';

module.exports = {
  getUnits,
  getUnitById,
  createUnit,
  getNewUnit,
  updateUnit,
  deleteUnit,
  checkIfUnitExists,
  checkCNPJ,
  checkAdress,
};
