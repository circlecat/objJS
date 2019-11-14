import Post from '../../Models/Post';

export const create = async (req, res, next) => {
  const { userId } = req.payload;
  const { title, body } = req.body;

  try {
    await Post.query().insert({ userId, title, body });
    res.send();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const get = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.query().findById(id);

    if (!post) {
      return res.status(400).json({ error: 'REQUEST_PARAMS_ERROR' });
    }

    return res.json(post);
  } catch (error) {
    return next(error);
  }
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const post = await Post.query().findById(id).patch({ title, body });

    return res.json(post);
  } catch (error) {
    return next(error);
  }
};

export const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Post.query().deleteById(id);

    return res.send();
  } catch (error) {
    return next(error);
  }
};

export const getAll = async (req, res, next) => {
  const { userId } = req.payload;

  try {
    const posts = await Post.query().where('userId', '=', userId);
    res.json(posts);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
