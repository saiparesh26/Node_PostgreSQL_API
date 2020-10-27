const { Router, request, response } = require('express');
const pool = require('../db/index');

const router = Router();

router.get('/', (request, response, next) => {

    pool.query('SELECT * FROM monstersworld.lives', (err, res) => {
        if(err) return next(err);

        response.json(res.rows);
    })
})

router.get('/conditions', (request, response, next) => {

    pool.query(
        'SELECT * FROM monstersworld.lives l JOIN monstersworld.habitats h ON h.name = l.habitat ',
        (err,res) => {
            if(err) return next(err);

            response.json(res.rows);
        }
        
    )
})

module.exports = router