const router = require('express').Router();


router.get('/', (req, res) => {
    res.json({ zoo: "zoooooos" });
})

module.exports = router;