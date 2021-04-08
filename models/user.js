const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    requred: [true, 'Заполни почту'],
    unique: [true, 'Значение почты должно быть уникальным'],
    validate: [validator.isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: [true, 'Заполни пароль'],
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Имя не может быть короче 2 символов'],
    maxlength: 30,
    validate: {
      validator: (v) => /[А-ЯЁ][а-яэ]+/.test(v),
      message: 'Имя должно быть на русском и начинаться с большой буквы',
    },
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Описание не может быть короче 2 символов'],
    maxlength: [30, 'Описание не может быть длиннее 30 символов'],
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/igm.test(v),
      message: 'Имя должно быть на русском и начинаться с большой буквы',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
