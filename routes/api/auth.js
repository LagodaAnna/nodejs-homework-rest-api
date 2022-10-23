const express = require('express');
const { schemas } = require('../../models/user');
const { validation, ctrlWrapper, auth } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/signup', validation(schemas.joiRegisterSchema), ctrlWrapper(ctrl.registerUser));
router.post('/login', validation(schemas.joiLoginSchema), ctrlWrapper(ctrl.loginUser));
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.patch(
  '/:userId/subscription',
  auth,
  validation(schemas.updateSubscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription),
);

module.exports = router;
