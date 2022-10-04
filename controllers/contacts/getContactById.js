const contactOperations = require('../../models/contacts');
const { NotFound } = require('http-errors');

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactOperations.getContactById(contactId);
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

module.exports = getContactById;
