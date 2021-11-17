const updateUser = async function (req, res, userModel) {
  const userToUpdate = req.body;
  try {
    const userWithThisId = await userModel.findByPk(userToUpdate.id);
    if (!userWithThisId) {
      return res.status(404).json({ error: 'user not found' });
    }
    await userWithThisId.update(req.body);
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send('an error occured');
  }
};

module.exports = updateUser;
