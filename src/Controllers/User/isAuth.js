import { verify } from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json('UNAUTHORIZED');
  }

  try {
    const token = auth.split(' ')[1];
    req.payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json('UNAUTHORIZED');
  }
};

export default isAuth;
