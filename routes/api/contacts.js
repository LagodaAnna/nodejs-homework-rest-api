const express = require('express');
const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper, auth } = require('../../middlewares');
const { schemas } = require('../../models/contact');
const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', auth, ctrlWrapper(ctrl.getContactById));

router.post('/', auth, validation(schemas.addJoiSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', auth, validation(schemas.addJoiSchema), ctrlWrapper(ctrl.updateContact));

router.patch(
  '/:contactId/favorite',
  auth,
  validation(schemas.updateFavoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact),
);

module.exports = router;
