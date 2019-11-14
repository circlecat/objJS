import { hash, compare } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import User from '../../Models/User';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from './auth';

export const get = async (req, res) => {
  if (!req.payload) {
    return res.status(403);
  }

  const user = await User.query().findById(req.payload.userId);

  return res.json(user.userToJSON());
};

export const register = async (req, res, next) => {
  const { email, password, username } = req.body;

  if (!password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  const hashedPass = await hash(password, 12);
  try {
    await User.query().insert({ email, username, password: hashedPass });
  } catch (error) {
    return next(error);
  }
  return res.send('registered');
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.query().findOne('email', email);
    if (!user) {
      return res.status(400).json({ error: 'can not find user' });
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: 'can not find user' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.json({ accessToken: createAccessToken(user) });
  } catch (error) {
    return next(error);
  }
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, accessToken: '' });
  }

  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.log(error);
    return res.send({ ok: false, accessToken: '' });
  }

  // Token is valid and we can send back an access
  const { userId, email } = payload;
  const user = await User.query().findOne({ id: userId, email });

  if (!user) {
    return res.send({ ok: false, accessToken: '' });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: '' });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.json({ ok: true, accessToken: createAccessToken(user) });
};

export const revokeRefreshToken = async (req, res) => {
  const { userId } = req.payload;

  try {
    await User.query().findById(userId).increment('tokenVersion', 1);
  } catch (error) {
    console.log(error);
    return res.send('error');
  }

  return res.send();
};
