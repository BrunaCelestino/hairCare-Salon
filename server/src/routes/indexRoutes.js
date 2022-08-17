const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).json({
    title: 'HairCare-Salon',
    version: '1.0.0',
    mensagem:
      'HairCare-Salon API is a system for scheduling appointments in any HairCare-Salon chain unit.',
  });
});

module.exports = routes;
