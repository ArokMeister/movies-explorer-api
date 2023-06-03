const notFoundRoutes = require('express').Router();
const handleNotFoundRoutes = require('./controller');

notFoundRoutes.use('*', handleNotFoundRoutes);

module.exports = notFoundRoutes;
