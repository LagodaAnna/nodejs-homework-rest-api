const contactOperations = require('../../models/contacts');

const listContacts = async (req, res, next) => {
  const contacts = await contactOperations.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
