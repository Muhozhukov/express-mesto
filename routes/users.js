const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserInfo, getUserById, changeUserInfo, changeUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:userId', getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), changeUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
}), changeUserAvatar);

module.exports = router;
