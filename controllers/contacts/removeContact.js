const { Contact } = require('../../models/contact');
const { NotFound } = require('http-errors');

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndRemove({ _id: contactId, owner });
  if (!result) {
    throw new NotFound();
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
  });
};

module.exports = removeContact;
