const { ifError } = require('assert');
const { error } = require('console');
const fs = require('fs')

class UsersServices {
    getUsers() {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                if (error) throw error;
                const arrUsers = JSON.parse(data)
                res(arrUsers)
            })
        })
    }
    getUsersByGender(req) {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                if (error) throw error;
                const arrUsers = JSON.parse(data);
                const filterUsers = arrUsers.filter(i => i.gender == req.gender)
                res(filterUsers)
            })
        })
    }

    getFiltredUsersByAge(req) {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                if (error) throw error;
                const arrUsers = JSON.parse(data);
                const { min, max } = req;
                if (!(min >= 0 && max <= 110)) {
                    return res({ status: 400, send: 'enter correct age: number from 0 to 110 years' })
                }
                const filtredUsers = arrUsers.filter(i => i.age >= min && i.age <= max);
                res({ status: 200, send: filtredUsers });
            })
        })
    }

    createUser(req) {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                if (error) throw error;
                const arrUsers = JSON.parse(data);
                let lastId = arrUsers[arrUsers.length - 1].id + 1;// create unical id
                req.body.id = lastId; // create unical id
                arrUsers.push(req.body);
                fs.writeFile('data.json', JSON.stringify(arrUsers), (error) => {
                    if (error) throw error;
                    fs.readFile('data.json', 'utf8', (error, data) => {
                        if (error) throw error;
                        const lastUser = JSON.parse(data).at(-1)
                        res(lastUser)
                    })
                });

            })
        })
    }

    updateUser(req) {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                const arrUsers = JSON.parse(data);
                const id = arrUsers.findIndex((i) => i.id == req.params.id);
                req.body.id = +req.params.id; // update body id depending on params id
                if (id != -1) {
                    const updateUser = arrUsers.map((i) => i.id == req.params.id ? req.body : i);
                    arrUsers.splice(0, arrUsers.length, ...updateUser);
                    fs.writeFile('data.json', JSON.stringify(arrUsers), (error) => {
                        if (error) throw error;
                        fs.readFile('data.json', 'utf8', (error, data) => {
                            if (error) throw error;
                            const users = JSON.parse(data)
                            res({ status: 200, send: users });
                        })
                    })
                } else {
                    arrUsers.push(req.body);
                    fs.writeFile('data.json', JSON.stringify(arrUsers), (error) => {
                        if (error) throw error;
                        fs.readFile('data.json', 'utf8', (error, data) => {
                            if (error) throw error;
                            res({ status: 201, send: req.body });
                        })
                    });

                }
            })
        })
    }

    updateNameUser(req) {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                if (error) throw error;
                const arrUsers = JSON.parse(data);
                const id = arrUsers.findIndex((i) => i.id == req.params.id);
                console.log(id);
                if (id == -1) return res({ status: 404, send: "user not found" });
                const updateUsers = arrUsers.map((i) => i.id == req.params.id ? { ...i, name: req.body.name } : i);
                arrUsers.splice(0, arrUsers.length, ...updateUsers)
                fs.writeFile('data.json', JSON.stringify(arrUsers), (error) => {
                    if (error) throw error;
                    fs.readFile('data.json', 'utf8', (error, data) => {
                        if (error) throw error;
                        const users = JSON.parse(data)
                        const result = users.filter(i => i.id == req.params.id);
                        res({ status: 200, send: result });
                    })
                })
            })
        })
    }

    deleteUser(req) {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                if (error) throw error;
                const arrUsers = JSON.parse(data);
                const id = arrUsers.findIndex((i) => i.id == req.params.id)
                if (id != -1) {
                    arrUsers.splice(id, 1);
                    fs.writeFile('data.json', JSON.stringify(arrUsers), (error) => {
                        if (error) throw error;
                        res(true)
                    });
                } else res(false);
            })
        })
    }
}

module.exports = new UsersServices()