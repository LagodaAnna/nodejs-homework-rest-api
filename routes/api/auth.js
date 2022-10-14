const express = require('express');
const { schemas } = require('../../models/user');
const { validation, ctrlWrapper } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/signup', validation(schemas.joiRegisterSchema), ctrlWrapper(ctrl.registerUser));
router.post('/login', validation(schemas.joiLoginSchema), ctrlWrapper(ctrl.loginUser));

module.exports = router;
