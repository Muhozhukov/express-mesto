const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя обязательно для заполнения'],
    minlength: [2, 'Имя не может быть короче 2 символов'],
    maxlength: 30,
    validate: {
      validator: (v) => /[А-ЯЁ][а-яэ]+/.test(v),
      message: 'Имя должно быть на русском и начинаться с большой буквы',
    },
  },
  about: {
    type: String,
    minlength: [2, 'Описание не может быть короче 2 символов'],
    maxlength: [30, 'Описание не может быть длиннее 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле аватар обязательно для заполнения'],
  },
});

module.exports = mongoose.model('user', userSchema);
