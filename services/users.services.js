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
                // чтобы ID не повторялись увеличиваем на единицу последний из списка
                let lastId = arrUsers[arrUsers.length - 1].id + 1;
                req.body.id = lastId; // изменяем переданный ID в body на сгенерированный нами
                arrUsers.push(req.body);
                fs.writeFile('data.json', JSON.stringify(arrUsers), (error) => {
                    if (error) throw error;
                    fs.readFile('data.json', 'utf8', (error, data) => {
                        if (error) throw error;
                        const users = JSON.parse(data);
                        const lastUser = users[[users.length - 1]]
                        console.log(lastUser);
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
                if (id == -1) return res({ status: 404, send: "user not found" });
                // обновляем поля пользователя, в зависимости от того что передали 
                let updateUsers = arrUsers.map((i) => {
                    if (i.id == req.params.id) {
                        if (i.name != req.body.name) {
                            return { ...i, name: req.body.name }
                        } else if (i.age != req.body.age) {
                            return { ...i, age: req.body.age }
                        } else if (i.gender != req.body.gender) {
                            return { ...i, gender: req.body.gender }
                        }
                    } else return i
                });
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