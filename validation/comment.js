const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.text = isEmpty(data.text) ? "" : data.text;

  if (validator.isEmpty(data.text)) {
    errors.text = "Post field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
