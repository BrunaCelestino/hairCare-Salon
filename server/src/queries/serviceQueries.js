const getServices = 'SELECT * FROM service';
const getServiceById = 'SELECT * FROM service WHERE id =  $1';
const getNewService = 'SELECT * FROM service WHERE name =  $1';
const createService = 'INSERT INTO service (name, description, price) VALUES ($1, $2, $3) ';
const checkIfServiceExists = 'SELECT s FROM service s WHERE s.name =  $1';
const updateService = 'UPDATE service SET name = $1, description = $2, price = $3 WHERE id = $4';
const deleteService = 'DELETE FROM service WHERE id = $1';

module.exports = {
  getServices,
  getServiceById,
  createService,
  getNewService,
  updateService,
  deleteService,
  checkIfServiceExists,
};
