const express = require('express');
const session = require('../middlewares/session');
const trimBody = require('../middlewares/trimBody');
const cors = require('../middlewares/cors');


module.exports = (app) => {
   
    app.use(cors());
    
    app.use(express.json());

    app.use(session());

    app.use(trimBody());

};