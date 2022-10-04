const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const pathToContacts = path.resolve(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(pathToContacts, 'utf-8');
  const products = data ? JSON.parse(data) : [];
  return products;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact ?? null;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) {
    return null;
  }
  const removedContact = contacts.splice(idx, 1);
  await fs.writeFile(pathToContacts, JSON.stringify(contacts));
  return removedContact;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = { ...body, id: v4() };
  contacts.push(newContact);
  await fs.writeFile(pathToContacts, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  // console.log(contacts);
  const idx = contacts.findIndex(({ id }) => id === contactId);

  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, id: contactId };
  await fs.writeFile(pathToContacts, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
