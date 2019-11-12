import { sign, verify } from 'jsonwebtoken';

export const createAccessToken = user =>
  sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

export const createRefreshToken = user =>
  sign({ userId: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

export const sendRefreshToken = (res, token) =>
  res.cookie('jid', token, {
    httpOnly: 'true',
  });

export const isAuth = req => {
  const auth = req.headers.authorization;
  if (!auth) {
    return false;
  }

  try {
    const token = auth.split(' ')[1];
    return verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.log(error);
  }
};
