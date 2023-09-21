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

    async getFiltredUsersByAge(req) {
        const users = await UserServices.getFiltredUsersByAge(req);
        return users;
    }
    async createUser(req) {
        const user = await UserServices.createUser(req);
        return user;
    }
}

module.exports = new UsersController();