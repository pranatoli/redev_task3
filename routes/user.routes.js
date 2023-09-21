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
router.delete('/:id', async (req, res) => {
    try {
        const response = await UsersController.deleteUser(req);
        res.send(response);
    } catch (error) {
        res.send('error: ' + error.message);
    }
})
router.put('/:id', async (req, res) => {
    try {
        const response = await UsersController.updateUser(req);
        res.status(response.status);
        res.send(response.send);
    } catch (error) {
        res.send('error: ' + error.message);
    }
})

module.exports = router;