const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true
}

const db = knex(knexConfig);


router.get('/', async (req, res) => {
    try {
        const zoos = await find();
        res.json(zoos);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const zoo = await find(id);
        if (zoo && Object.keys(zoo) > 0) return res.json(zoo);
        return res.status(400).json({message: "No zoo found with that ID."});
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newZoo = await add(req.body);
        if (newZoo) return res.status(200).json(newZoo);
        res.status(400).json({ message: "Unable to add zoo."})
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Helper methods
const find = id => {
    if (!id) return db('zoos');

    // Find by id
    // select * from zoos where id = id
    return db('zoos').where('id', id);
}

const add = async zoo => {
    const newUser = await db('zoos').insert(zoo);

    return find(newUser[0]);
}

module.exports = router;