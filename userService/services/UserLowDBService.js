"use strict"

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = low(new FileSync('dbUsers.json'));

class UserLowDBService {

    constructor() { }

    /**
     * Retourne tous les utilisateurs
     * @returns {*}
     */
    get() {
        return db.get("users").value();
    }

    /**
     * Retourne l'utilisateur référencée par l'id donné
     * @param id Id de l'utilisateur à retourner
     * @returns {*}
     */
    getById(id) {
        return db.get('users').find({ id: id }).value();
    }

    /**
     * Ajoute un utilisateur
     * @param user Utilisateur à ajouter
     */
    create(user) {
        db.get("users").push(user).write();
    }

    /**
     * Met à jour un utilisateur
     * @param id Id de l'utilisateur à mettre à jour
     * @param data Données de l'utilisateur à mettre à jour
     */
    update(id, data) {
        db.get("users").find({ id: id }).assign(data).write();
    }

    /**
     * Supprime un utilisateur d'après son id
     * @param id Id de l'utilisateur à supprimer
     */
    deleteById(id) {
        db.get("users").remove({ id: id }).write();
    }

}

module.exports = UserLowDBService;