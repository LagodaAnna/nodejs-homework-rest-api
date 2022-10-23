const { User } = require('../../models/user');
const { NotFound } = require('http-errors');

const updateSubscription = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

  if (!user) {
    throw new NotFound();
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      user,
    },
  });
};

module.exports = updateSubscription;
