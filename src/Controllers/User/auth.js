import { sign } from 'jsonwebtoken';

export const createAccessToken = user =>
  sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });


export const createRefreshToken = user =>
  sign({ userId: user.id, email: user.email, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

export const sendRefreshToken = (res, token) =>
  res.cookie('jid', token, {
    httpOnly: 'true',
  });
