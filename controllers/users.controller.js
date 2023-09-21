const UserServices = require('../services/users.services');

class UsersController {
    async getUsers() {
        const users = await UserServices.getUsers();
        return users;
    }
    async getUsersByGender(req) {
        const users = await UserServices.getUsersByGender(req);
        return users;
    }
}

module.exports = new UsersController();