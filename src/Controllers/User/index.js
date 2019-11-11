import User from '../../Models/User';

const getUser = async (req, res) => {
  //const response = await User.query().findById();
  return res.send();
};

export default {
  getUser,
};
