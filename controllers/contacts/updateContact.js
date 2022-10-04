const contactOperations = require('../../models/contacts');
const { NotFound } = require('http-errors');

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contactOperations.updateContact(contactId, req.body);
  // console.log(result);
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
