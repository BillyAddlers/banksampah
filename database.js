const Enmap = require('enmap');

class Database extends Enmap {
    constructor(options) {
        super(options);
    }
    getUser(id) {
        let data = {}
        if (this.has(id)) {
            data = this.get(id);
            return data;
        } else {
            return "User doesn't exist"
        }
    }
    setUser(id, data) {
        data.id = id
        if (this.has(id)) {
            return "User already exists";
        } else {
            this.set(id, data);
            return "User created";
        }
    }

    checkUser(email, password) {
        let final = {
            state: false,
            id: "a"
        }
        let data = this.find(user => user.email === email)
        final.id = data.id
        if (data.password === password) {
            data = this.get(data.id);
            if (data.password === password) {
                final.state = true;
                return final
            } else {
                return final
            }
        } else {
            return final
        }
    }

    deleteUser(id) {
        if (this.has(id)) {
            this.delete(id);
            return "User deleted";
        } else {
            return "User doesn't exist";
        }
    }
}

module.exports.Database = Database;
