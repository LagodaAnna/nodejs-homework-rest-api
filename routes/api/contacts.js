const express = require('express');
const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { schemas } = require('../../models/contact');
const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post('/', validation(schemas.addJoiSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', validation(schemas.addJoiSchema), ctrlWrapper(ctrl.updateContact));

router.patch(
  '/:contactId/favorite',
  validation(schemas.updateFavoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact),
);

module.exports = router;
