const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Это поле обязательно для заполнения'],
    minlength: [2, 'Имя не может быть короче 2 символов'],
    maxlength: [30, 'Имя не может быть длиннее 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Это поле обязательно для заполнения'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.mow,
  },
});

module.exports = mongoose.model('card', cardSchema);
