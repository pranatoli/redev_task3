const express = require('express');
const router = express.Router();
const usersRoutes = require('./users.routes');
const userRoutes = require('./user.routes');

router.use('/user', userRoutes);
router.use('/users', usersRoutes);

module.exports = router;