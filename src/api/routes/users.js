const router = require('express').Router();

router.get('/test',(req, res) => {
    res.send('user test is successfull');
});


router.post('/',(req,res) => {
    const username = req.body.username;
    res.send(`your username is: ${username}`);
});

module.exports = router;