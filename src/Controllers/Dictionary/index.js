import Dictionary from '../../Models/Dictionary';

export const create = async (req, res, next) => {
  const { userId } = req.payload;
  const {
    title,
    description,
    folderId,
    isPublic,
  } = req.body;

  try {
    await Dictionary.query().insert({
      userId,
      title,
      description,
      isPublic,
      folderId,
    });
    res.send();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const get = async (req, res, next) => {
  const { id } = req.params;

  try {
    const dictionary = await Dictionary.query().findById(id);

    if (!dictionary) {
      return res.status(400).json({ error: 'REQUEST_PARAMS_ERROR' });
    }

    return res.json(dictionary);
  } catch (error) {
    return next(error);
  }
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    description,
    folderId,
    isPublic,
  } = req.body;

  try {
    const dictionary = await Dictionary.query().findById(id).patch({
      title,
      description,
      isPublic,
      folderId,
    });

    return res.json(dictionary);
  } catch (error) {
    return next(error);
  }
};

export const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Dictionary.query().deleteById(id);

    return res.send();
  } catch (error) {
    return next(error);
  }
};

export const getAll = async (req, res, next) => {
  const { userId } = req.payload;

  try {
    const dictionaries = await Dictionary.query().where('userId', '=', userId);
    res.json(dictionaries);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
