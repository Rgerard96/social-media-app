import User from '../../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-micro';
import {
  UserRegisterValidator,
  UserLoginValidator,
} from '../../utils/UserValidator.js';

const SECRET_KEY = process.env.SECRET_KEY;

// Generate Auth Token for User
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: '30d' }
  );
};

export const usersResolver = {
  Query: {},
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // TODO Validate user input
      const { errors, valid } = UserRegisterValidator(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', {
          errors,
        });
      }
      // TODO Check if user exist
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError('This email already exist', {
          errors: {
            user: 'This email already exist',
          },
        });
      }
      // TODO Hash user password
      password = await bcryptjs.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async login(_, { email, password }) {
      // TODO Validate user input
      const { errors, valid } = UserLoginValidator(email, password);
      if (!valid) {
        throw new UserInputError('Errors', {
          errors,
        });
      }
      // TODO Check if user exist
      const user = await User.findOne({ email });
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', {
          errors,
        });
      }
      // TODO Check if user password is correct
      const match = await bcryptjs.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', {
          errors,
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
