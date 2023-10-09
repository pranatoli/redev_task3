const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const Sentry = require('@sentry/node');
Sentry.init({
    dns: 'https://86b2967863a72e1e52d7eb37ec896b60@o4505951837880320.ingest.sentry.io/4505952053231616'
});
const { query, param, matchedData, validationResult } = require('express-validator');

/**
 *@swagger
 *  /api/users:
 *    get:
 *      tags:
 *         - Users
 *      summary: Get list users
 *      description: Get all users
 *      responses:
 *          "200": 
 *            description: Get list users
 *          "400":
 *            description: bad request
 * 
 */
router.get('/', async (req, res) => {
    try {
        const users = await UsersController.getUsers();
        res.send(users)
    } catch (error) {
        Sentry.captureException(error);
        res.send('error: ' + error.message);
    }
})
/**
 *@swagger
 *  /api/users/filtredUsers:
 *    get:
 *      tags:
 *         - Users
 *      summary: Get user by age
 *      description: Get users with age filter (min = 0, max = 110)
 *      parameters:
 *        - name: min
 *          in: query
 *          required: true 
 *        - name: max
 *          in: query
 *          required: true
 *      requestBody:
 *          sdsd
 *      responses:
 *          "200": 
 *            description: Get list users by age
 *          "400":
 *            description: Bad request
 * 
 */
router.get('/filtredUsers', [
    query('min').notEmpty().isInt(),
    query('max').notEmpty().isInt()
],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() })
        }
        try {
            if (result.isEmpty()) {
                const data = matchedData(req);
                const users = await UsersController.getFiltredUsersByAge(data);
                res.status(users.status).send(users.send);
            }
        } catch (error) {
            Sentry.captureException(error);
            res.send('error: ' + error.message);
        }
    })
/**
 *@swagger
 *  /api/users/{gender}:
 *    get:
 *      tags:
 *         - Users
 *      summary: Get users by gender (man or women)
 *      description: Get users by gender
 *      parameters:
 *        - name: gender
 *          in: path
 *          required: true
 *      responses:
 *          "200": 
 *            description: A successful response, get filtred list users
 *          "400":
 *            description: bad request
 * 
 */
router.get('/:gender',
    param('gender').notEmpty().escape(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() })
        }
        try {
            const data = matchedData(req);
            if (data.gender == 'man' || data.gender == 'women') {
                const users = await UsersController.getUsersByGender(matchedData(req));
                res.send(users);
            } else {
                res.status(400).send('error:  enter correct data: man or women');
            }

        } catch (error) {
            Sentry.captureException(error);
            res.send('error: ' + error.message);
        }
    })

module.exports = router;