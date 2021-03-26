"use strict"

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = low(new FileSync('db.json'));

class TagLowDBService {
    constructor() { }

    /**
     * Retourne tous les tags
     * @returns {*}
     */
    get() {
        return db.get("tags").value();
    }

    /**
     * Retourne le tag référencé par l'id donné
     * @param id Id du tag à retourner
     * @returns {*}
     */
    getById(id) {
        return db.get('tags').find({ id: id }).value();
    }

    /**
     * Ajoute un tag
     * @param tag Tag a ajouter
     */
    create(tag) {
        db.get("tags").push(tag).write();
    }

    /**
     * Met à jour un tag
     * @param id Id du tag à mettre à jour
     * @param data Données du tag à mettre à jour
     */
    update(id, data) {
        db.get("tags").find({ id: id }).assign(data).write();
    }

    /**
     * Supprime un tag d'après son id
     * @param id Id du tag à supprimer
     */
    deleteById(id) {
        db.get("tags").remove({ id: id }).write();
    }
}

module.exports = TagLowDBService;