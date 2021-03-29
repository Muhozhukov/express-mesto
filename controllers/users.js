/* eslint-disable consistent-return */
const User = require('../models/user');

const errorHandle = (res, req, err) => {
  if (err.name === 'ValidationError') {
    res.status(400)
      .send({
        message: `${Object.values(err.errors)
          .map((error) => error.message).join(', ')}`,
      });
  } else {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ощибка' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      errorHandle(res, req, err);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      errorHandle(res, req, err);
    });
};

const changeUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      errorHandle(res, req, err);
    });
};

const changeUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      errorHandle(res, req, err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  changeUserInfo,
  changeUserAvatar,
};
