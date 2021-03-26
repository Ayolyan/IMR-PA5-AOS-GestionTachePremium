"use strict"

const axios = require('axios');

class TagController {
    getList(req, res) {
        axios.get('http://localhost:3000/api/v1/tags')
            .then((response) => {
                res.render('tags/list', { tags: response.data });
            })
            .catch(err => res.send(err));
    }
}

module.exports = TagController;