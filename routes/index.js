const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
// const { login } = require('../controllers/users');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
