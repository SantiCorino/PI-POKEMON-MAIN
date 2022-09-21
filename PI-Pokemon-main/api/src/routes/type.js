const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Type } = require('../db');
const { getAllTypes } = require('./utils/getTypes')

router.get('/', async (req, res, next) => {
    try {
        await getAllTypes();
        const allTypes = await Type.findAll();
        res.send(allTypes);
    } catch (error) {
        next(error);
    }    
})

module.exports = router;