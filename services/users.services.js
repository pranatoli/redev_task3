const { ifError } = require('assert');
const { error } = require('console');
const fs = require('fs')
// connect file with users

class UsersServices {
    getUsers() {
        return new Promise((res, rej) => {
            const users = fs.readFile('data.json', 'utf8', (error, data) => {
                if (error) throw error;
                const arrUsers = JSON.parse(data)
                res(arrUsers)
            })
        })
    }
    getUsersByGender(req) {
        return new Promise((res, rej) => {
            const users = fs.readFile('data.json', 'utf8', (error, data) => {
                if (error) throw error;
                const arrUsers = JSON.parse(data);
                const filterUsers = arrUsers.filter(i => i.gender == req.params.gender)
                res(filterUsers)
            })
        })
    }

    getFiltredUsersByAge(req) {
        return new Promise((res, rej) => {
            const users = fs.readFile('data.json', 'utf8', (error, data) => {
                if (error) throw error;
                const arrUsers = JSON.parse(data);
                const { min, max } = req.query;
                console.log(min);
                const filtredUsers = arrUsers.filter(i => i.age >= min && i.age <= max);
                res(filtredUsers);
            })
        })
    }
}

module.exports = new UsersServices()