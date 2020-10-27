const  { Router, request, response } = require('express');
const pool = require('../db/index');

const router = Router();

router.get('/', (request ,response , next) => {
    pool.query('SELECT * FROM monstersworld.monsters ORDER BY id ASC', (err , res) => {
        if(err) return next(err);
    
        response.json(res.rows);
    });
})

router.get('/:id', (request,response,next) => {
    const { id } = request.params;
    pool.query('SELECT * FROM monstersworld.monsters where id = $1 ORDER BY id ASC', [id], (err , res) => {
        if(err) return next(err);
    
        response.json(res.rows);
    });
});

router.post('/', (request,response,next) => {
    const { name, personality } = request.body;

    pool.query('INSERT INTO monstersworld.monsters(name, personality) VALUES ($1, $2)', [name, personality], (err,res) => {
        if(err) return next(err);

        response.redirect('/monsters');
    })
});

router.put('/:id', (request, response, next) => {
    const { id } = request.params;
    const keys = ['name', 'personality'];
    const fields = [];

    keys.forEach(key => {
        if(request.body[key]) fields.push(key);
    })

    fields.forEach(field => {
        pool.query(
            `UPDATE monstersworld.monsters SET ${field} = $1 where id = $2`,
            [request.body[field] , id],
            (err, res) => {
                if(err) return next(err);
            }
        )
    })

    response.redirect('/monsters');
    
})

router.delete('/:id', (request, response, next) => {
    const { id } = request.params;

    pool.query(
        'DELETE FROM monstersworld.monsters where id = $1',
        [id],
        (err, res) => {
            if(err) return next(err);

            response.redirect('/monsters');
        }
    )
})

module.exports = router;