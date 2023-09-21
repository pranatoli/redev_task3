const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');

router.get('/', async (req, res) => {
    try {
        const users = await UsersController.getUsers();
        res.send(users)
    } catch (error) {
        res.send('error: ' + error.message);
    }
})

router.get('/:gender', async (req, res) => {
    try {
        const users = await UsersController.getUsersByGender(req);
        res.send(users)
    } catch (error) {
        res.send('error: ' + error.message);
    }
})

module.exports = router;