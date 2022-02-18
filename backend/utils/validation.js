import Joi from "joi";

export const newPage = Joi.object({
  // title: Joi.string().required(),
  // content: Joi.string().required(),
});

export const updatePage = Joi.object({
  action: Joi.string().required(),
  title: Joi.string().allow(""),
  content: Joi.string().allow(""),
});
