const { Router } = require('express');
const { loginUser, createUser } = require('../controllers/user.controllers');

const router = Router();


router.post('/signin', loginUser);

router.post('/signup', createUser);




module.exports = router;