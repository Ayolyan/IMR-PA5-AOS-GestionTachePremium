"use strict"

const { nanoid } = require('nanoid');
const TagService = require('../services/TagService');
const Tag = require('../models/Tag');

class TagAPIController {
    /* GET all tags */
    get(req, res) {
        const tagService = TagService.getInstance();
        res.json(tagService.get());
    }

    /* GET tag by id */
    getById(req, res) {
        const tagService = TagService.getInstance();
        res.json(tagService.getById(req.params.id));
    }

    /* CREATE tag */
    post(req, res) {
        const tagService = TagService.getInstance();

        const name = req.body.name;
        const tag = new Tag(
            nanoid(8),
            name
        );

        tagService.create(tag);

        res.json(tag);
    }

    /* UPDATE tag */
    put(req, res) {
        const tagService = TagService.getInstance();
        tagService.update(req.params.id, req.body);

        res.json(req.body);
    }

    /* DELETE tag */
    delete(req, res) {
        const tagService = TagService.getInstance();
        tagService.deleteById(req.params.id);

        res.json("Successful Deleted");
    }
}

module.exports = TagAPIController;