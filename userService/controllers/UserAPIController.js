"use strict"

const { nanoid } = require('nanoid');
const UserService = require('../services/UserService');
const User = require('../models/User');

class UserAPIController {
    get(req, res) {
        const userService = UserService.getInstance();
        res.json(userService.get());
    }

    /* GET user by id */
    getById(req, res) {
        const userService = UserService.getInstance();
        res.json(userService.getById(req.params.id));
    }

    /* CREATE user */
    post(req, res) {
        const userService = UserService.getInstance();

        try {
            const user = new User(
                nanoid(8),
                req.body.username,
            );

            userService.create(user);

            res.json(user);
        } catch (err) {
            res.status(400).json({ errors: [{ message: err.message }] });
        }
    }

    /* UPDATE user */
    put(req, res) {
        const userService = UserService.getInstance();

        const userEditedFields = req.body;

        if (userEditedFields.id !== undefined) {
            if (userEditedFields.id !== req.params.id) {
                res.status(400).json({ errors: [{ message: 'L\'id d\'un utilisateur ne peut être changé via cette API' }] });
            }
        }

        userService.update(req.params.id, userEditedFields);

        res.json("Successful Updated");
    }

    /* DELETE user */
    delete(req, res) {
        const userService = UserService.getInstance();
        userService.deleteById(req.params.id);

        res.json("Successful Deleted");
    }
}

module.exports = UserAPIController;