"use strict"

class TagService {

    static getInstance() {
        switch (process.env.DBPROVIDER) {
            case 'LowDB':
                const TagLowDBService = require("./TagLowDBService");
                return new TagLowDBService();
                break;
        }
    }

    get() {
        throw new Error('Method get not implemented.');
    }

    getById(id) {
        throw new Error('Method getById not implemented.');
    }

    create(task) {
        throw new Error('Method create not implemented.');
    }

    update(id, data) {
        throw new Error('Method update not implemented.');
    }

    deleteById(id) {
        throw new Error('Method delete not implemented.');
    }

}

module.exports = TagService;