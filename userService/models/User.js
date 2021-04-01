"use strict"

class UserModel {

    constructor(id, username) {
        this.setId(id);
        this.setUsername(username);
    }

    setId(id) {
        this.id = id;
    }

    setUsername(username) {
        this.username = username;
    }

}

module.exports = UserModel