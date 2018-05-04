// require express node module
var express = require('express');

// use express Router for route handling
var router = express.Router();

// import model
var egg = require("../models/eggs.js");

// CREATE ROUTES

// get route
router.get('/', (req, res) => {
    
    // call egg model method .all
    egg.all((data) => {
        
        // create handlebars obj
        var hbsObject = {
            eggs: data
        };
        console.log(hbsObject);

        // pass to handlebar index view
        res.render('index', hbsObject);
    });
});

// post route
router.post('/api/eggs', (req, res) => {

    // call egg model method .create
    egg.create(['egg_name', 'devoured'], [req.body.name, req.body.devoured], (result) => {

        // return json object with new ID
        res.json({ id: result.newId });
    });
});

// export for use by server.js
module.exports = router;