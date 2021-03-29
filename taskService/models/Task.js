"use strict"

class TaskModel {

    constructor(id, title, dateBegin, dateEnd, state, tags) {
        this.id         = id;
        this.title      = title;
        this.dateBegin  = dateBegin;
        this.dateEnd    = dateEnd;
        this.state      = state;
        this.tags       = tags;
    }

}

module.exports = TaskModel