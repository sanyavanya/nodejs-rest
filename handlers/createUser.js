const uuid = require('uuid');

const createUser = async function (req, res, userModel) {
  try {
    const userWithThisLogin = await userModel.findOne({
      where: {
        login: req.body.login,
      },
    });
    console.log(userWithThisLogin);
    if (userWithThisLogin) {
      return res.status(400).json({ error: 'username taken' });
    }
    const newUser = await userModel.create({
      id: uuid.v4(),
      ...req.body,
      isDeleted: false,
    });
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send('an error occured');
  }
  res.status(201).send();
};

module.exports = createUser;
