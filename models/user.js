const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/authorization-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = (email, password) => this.findOne({ email })
  .select('+password')
  .then((user) => {
    if (!user) {
      return Promise.reject(
        new AuthorizationError('Incorrect email or password'),
      );
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return user;
    });
  });

module.exports = mongoose.model('user', userSchema);
