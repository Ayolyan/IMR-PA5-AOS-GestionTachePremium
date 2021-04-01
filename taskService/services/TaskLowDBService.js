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
     * Retourne les taches non annulée, non achevées et non arrivées à échéance
     * @returns {*}
     */
    getAchievable() {
        return db.get("tasks").filter((task) => {
            /* Le code suivant a été développé pour la compréhension, il pourrait être factorisé en une ligne */
            let condition = true;
            // Filtre des taches non annulées
            condition &= task.state !== 'annulée';
            // Filtre des taches non achevées
            condition &= task.state !== 'achevée';
            // Filtre des taches non arrivées à échéance (dont la date de fin est supérieure à la date courante)
            condition &= Date.parse(task.dateEnd) > new Date();

            return condition;
        }).value();
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
     * Retourne les tâches catégorisées par le tag d'id donnés
     * @param tagId Id du tag catégorisant les tâches à retourner
     * @returns {*}
     */
    getByTagId(tagId) {
        return db.get('tasks').filter(task => task.tags.includes(tagId)).value();
    }

    /**
     * Retourne les tâches catégorisées par les tag d'id donnés
     * @param tagsId Identifiants des tags catégorisant les tâches à retourner
     * @returns {*}
     */
    getByTagsIdAnd(tagsId) {
        return db.get('tasks').filter(task => {
            let condition = true;
            for (let tagId of tagsId) {
                condition &= task.tags.includes(tagId);
            }
            return condition;
        }).value();
    }

    /**
     * Retourne les tâches catégorisées par les tag d'id donnés
     * @param tagsId Identifiants des tags catégorisant les tâches à retourner
     * @returns {*}
     */
    getByTagsIdOr(tagsId) {
        return db.get('tasks').filter(task => {
            let condition;
            for (let tagId of tagsId) {
                condition |= task.tags.includes(tagId);
            }
            return condition;
        }).value();
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
     * Met à jour une tâche en lui ajoutant un utilisateur
     * @param id Id de la tâche à mettre à jour
     * @param userId Id de l'utilisateur à ajouter
     */
    updateAddUserById(id, userId) {
        const task = db.get("tasks").find({ id: id });
        let taskUsers = task.value().users;

        if (!task.value().users.includes(userId)) {
            taskUsers.push(userId);
        } else {
            throw new Error("Utilisateur déjà lié à la tâche.");
        }

        task.assign({ users: taskUsers}).write();
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