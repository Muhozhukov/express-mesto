const Card = require('../models/card');

const errorHandle = (res, req, err) => {
  if (err.name === 'ValidationError') {
    res.status(400)
    .send({ message: `${Object.values(err.errors)
      .map((error) => error.message).join(', ')}`});
    console.log(res.status)
  } else if (err.name === 'CastError') {
    return res.status(404).send({ message: "Запрашиваемый ресурс не найден"});
  } else {
    res.status(500).send({ message: "Произошла ошибка"})
  }
}

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ cards }))
    .catch((err) => res.status(500).send({ message: "Произошла ощибка" }));
}

const createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link, ownerId } = req.body;
  Card.create({ name, link, owner: req.user._id})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      errorHandle(res, req, err);
    });
}

const deleteCard = (req, res) => {
  const cardId = req.params.cardId;
  Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      errorHandle(res, req, err);
    });
}

const likeCard = (req, res)  => {
  const cardId = req.params.cardId;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id }}, {new: true})
    .then(card => res.send({card}))
    .catch((err) => {
      errorHandle(res, req, err);
    });
}

const dislikeCard = (req, res)  => {
  const cardId = req.params.cardId;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id }}, {new: true})
    .then(card => res.send({card}))
    .catch((err) => {
      errorHandle(res, req, err);
    });
}
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
}
