const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = isEmpty(data.text) ? "" : data.text;

  if (!validator.isLength(data.title, { min: 5, max: 30 })) {
    errors.title = "Post title must be between 5 and 30 characters";
  }

  if (validator.isEmpty(data.title)) {
    errors.title = "Post field is required";
  }

  if (!validator.isLength(data.description, { min: 10, max: 300 })) {
    errors.description = "Post must be between 10 and 300 characters";
  }

  if (validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
