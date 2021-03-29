"use strict"

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = low(new FileSync('dbTasks.json'));

class TaskLowDBService {

    constructor() { }

    /**
     * Retourne toutes les taches
     * @returns {*}
     */
    get() {
        return db.get("tasks").value();
    }

    /**
     * Retourne la tache référencée par l'id donné
     * @param id Id de la tache à retourner
     * @returns {*}
     */
    getById(id) {
        return db.get('tasks').find({ id: id }).value();
    }

    /**
     * Ajoute une täche
     * @param task Tache a ajouter
     */
    create(task) {
        db.get("tasks").push(task).write();
    }

    /**
     * Met à jour une tâche
     * @param id Id de la tâche à mettre à jour
     * @param data Données de la tâche à mettre à jour
     */
    update(id, data) {
        db.get("tasks").find({ id: id }).assign(data).write();
    }

    /**
     * Supprime une tâche d'après son id
     * @param id Id de la tâche à supprimer
     */
    deleteById(id) {
        db.get("tasks").remove({ id: id }).write();
    }

}

module.exports = TaskLowDBService;