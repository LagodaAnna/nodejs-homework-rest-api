const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone number'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const addJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required().error(new Error('missing field favorite')),
});

const schemas = {
  addJoiSchema,
  updateFavoriteJoiSchema,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
