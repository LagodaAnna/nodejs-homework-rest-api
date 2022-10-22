const { Contact } = require('../../models/contact');
const { NotFound } = require('http-errors');

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true });

  if (!result) {
    throw new NotFound();
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
