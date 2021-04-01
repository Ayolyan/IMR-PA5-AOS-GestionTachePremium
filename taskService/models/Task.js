"use strict"

class TaskModel {

    static statevalue = [
        'non precise',
        'une tache est requise',
        'en cours',
        'achevee',
        'annulee'
    ];

    constructor(id, title, dateBegin, dateEnd, state, tags) {
        this.setId(id);
        this.setTitle(title);
        this.setDates(dateBegin, dateEnd);
        this.setState(state);
        this.setTags(tags);
    }

    setId(id) {
        this.id = id;
    }

    setTitle(title) {
        this.title = title;
    }

    setDates(dateBegin, dateEnd) {
        if (dateBegin < dateEnd) {
            this.dateBegin = dateBegin;
            this.dateEnd = dateEnd;
        } else {
            throw Error("La date de fin doit être supérieure à la date de début");
        }
    }

    setState(state) {
        if (TaskModel.statevalue.includes(state)) {
            this.state = state;
        } else {
            throw Error("L'état renseigné ne fait pas partie de la liste des états possible");
        }
    }

    setTags(tags) {
        this.tags = tags;
    }

}

module.exports = TaskModel