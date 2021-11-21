const deleteUser = async function (req, res, userModel) {
    try {
        await userModel.update({ isDeleted: true }, { where: { id: req.user.id } });
        return res.status(202).send();
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: 'user not found' });
    }
};

module.exports = deleteUser;
