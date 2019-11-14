import Post from '../../Models/Post';

export const create = async (req, res) => {
  const { userId } = req.payload;
  const { title, body } = req.body;

  try {
    await Post.query().insert({ userId, title, body });
    res.send();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.data });
  }
};

export const get = async (req, res) => {

};

export const getAll = async (req, res) => {
  const { userId } = req.payload;

  try {
    const posts = await Post.query().where('userId', '=', userId);
    //const user = await Post.relatedQuery('user').findById(userId);
    console.log(user);
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.data });
  }
};
