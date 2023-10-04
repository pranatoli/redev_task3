const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const Sentry = require('@sentry/node');
Sentry.init({
    dns: 'https://86b2967863a72e1e52d7eb37ec896b60@o4505951837880320.ingest.sentry.io/4505952053231616'
});
const { body, query, param, matchedData, validationResult } = require('express-validator');

const validationBodyId = [
    body('id').notEmpty().isInt(),
];
const validationBodyName = [
    body('name').notEmpty().isString().trim(),
];
const validationBodyGender = [
    body('gender').notEmpty().isString().trim(),
];
const validationBodyAge = [
    body('age').notEmpty().isInt(),
];

const validationParamId = [
    param('id').notEmpty().isInt(),
]

router.post('/', validationBodyId, validationBodyName, validationBodyGender, validationBodyAge, async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() })
    }
    try {
        const user = await UsersController.createUser(req);
        res.send(user);
    } catch (error) {
        Sentry.captureException(error);
        res.send('error: ' + error.message);
    }
})
router.delete('/:id', validationParamId, async (req, res) => { // создать проверку param.id
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() })
    }
    try {
        const response = await UsersController.deleteUser(req);
        res.send(response);
    } catch (error) {
        Sentry.captureException(error);
        res.send('error: ' + error.message);
    }
})
router.put('/:id', validationParamId, validationBodyName, validationBodyGender, validationBodyAge, async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() })
    }
    try {
        const response = await UsersController.updateUser(req);
        res.status(response.status);
        res.send(response.send);
    } catch (error) {
        Sentry.captureException(error);
        res.send('error: ' + error.message);
    }
})

router.patch('/:id', validationParamId, validationBodyName, async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() })
    }
    try {
        const response = await UsersController.updateNameUser(req);
        res.status(response.status)
        res.send(response.send)
    } catch (error) {
        Sentry.captureException(error);
        res.send('error: ' + error.message);
    }
})

module.exports = router;