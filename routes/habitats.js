const { Router, request, response } = require('express');
const pool = require('../db/index');

const router = Router();

router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM monstersworld.habitats ORDER BY id ASC', (err , res) => {
        if(err) return next(err);
    
        response.json(res.rows);
    });
})

router.post('/', (request, response, next) => {
    const { name, climate , temperature } = request.body;
    
    pool.query(
        'INSERT INTO monstersworld.habitats(name, climate, temperature) VALUES($1, $2 , $3) ',
        [name,climate,temperature],
        (err,res) => {
            if(err) return next(err);

            response.redirect('/habitats');
        }
    )
})

module.exports = router