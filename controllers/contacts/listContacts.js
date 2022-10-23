const { Contact } = require('../../models/contact');

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { limit = 10, page = 1, favorite = [true, false] } = req.query;

  const skip = (page - 1) * limit;

  const contacts = await Contact.find({
    owner,
    favorite,
  })
    .skip(skip)
    .limit(limit);

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
// favorite: favorite ? { $eq: favorite } : { $nin: [favorite] },
