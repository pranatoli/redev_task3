const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');

router.post('/', async (req, res) => {
    try {
        const user = await UsersController.createUser(req);
        res.send(user);
    } catch (error) {
        res.send('error: ' + error.message);
    }
})

module.exports = router;