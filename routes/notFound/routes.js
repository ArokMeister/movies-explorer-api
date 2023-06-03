const notFoundRoutes = require('express').Router();
const handleNotFoundRoutes = require('../../components/notFound/controller');

notFoundRoutes.use('*', handleNotFoundRoutes);

module.exports = notFoundRoutes;
