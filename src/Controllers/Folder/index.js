import Folder from '../../Models/Folder';

export const create = async (req, res, next) => {
  const { userId } = req.payload;
  const { title, description } = req.body;

  try {
    await Folder.query().insert({ userId, title, description });
    res.send();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const get = async (req, res, next) => {
  const { id } = req.params;

  try {
    const folder = await Folder.query().findById(id);

    if (!folder) {
      return res.status(400).json({ error: 'REQUEST_PARAMS_ERROR' });
    }

    return res.json(folder);
  } catch (error) {
    return next(error);
  }
};

export const getAll = async (req, res, next) => {
  const { userId } = req.payload;

  try {
    const folders = await Folder.query().where('userId', '=', userId);
    res.json(folders);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
