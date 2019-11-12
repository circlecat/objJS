import { hash, compare } from 'bcryptjs';
import User from '../../Models/User';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  isAuth,
} from '../../Controllers/User/auth';

const get = async (req, res) => {
  const payload = isAuth(req);
  if (!payload) {
    return res.status(403);
  }
  console.log(payload);
  const user = await User.query().findById(payload.userId);

  return res.json(user);
};

const register = async (req, res) => {
  const { email, password, username } = req.body;

  if (!password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  const hashedPass = await hash(password, 12);
  try {
    await User.query().insert({ email, username, password: hashedPass });
  } catch (error) {
    return res.status(400).json({ errors: error.data });
  }
  return res.send('registered');
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.query().where('email', email);
    if (!user.length) {
      return res.status(400).json({ error: 'can not find user' });
    }

    const valid = await compare(password, user[0].password);
    if (!valid) {
      return res.status(400).json({ error: 'can not find user' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.json({ accessToken: createAccessToken(user) });
  } catch (error) {
    return res.status(400).json({ errors: error.data });
  }
};

export default {
  get,
  register,
  login,
};
