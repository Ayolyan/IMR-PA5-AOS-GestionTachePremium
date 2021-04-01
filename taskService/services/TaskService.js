"use strict"

class TaskService {

    static getInstance() {
        switch (process.env.DBPROVIDER) {
            case 'LowDB':
                const TaskLowDBService = require("./TaskLowDBService");
                return new TaskLowDBService();
                break;
        }
    }

    get() {
        throw new Error('Method get not implemented.');
    }

    getAchievable() {
        throw new Error('Method getAchieved not implemented');
    }

    getById(id) {
        throw new Error('Method getById not implemented.');
    }

    getByTagIdAnd(tagId) {
        throw new Error('Method getByTagIdAnd not implemented');
    }

    getByTagIdOr(tagId) {
        throw new Error('Method getByTagIdOr not implemented');
    }

    getByTagsId(tagsId) {
        throw new Error('Method getByTagsId not implemented');
    }

    create(task) {
        throw new Error('Method create not implemented.');
    }

    update(id, data) {
        throw new Error('Method update not implemented.');
    }

    updateAddUserById (id, userId) {
        throw new Error('Method updateAddUserById not implemented.');
    }

    deleteById(id) {
        throw new Error('Method delete not implemented.');
    }

}

module.exports = TaskService;