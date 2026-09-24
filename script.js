// This user needs to be validated
const user = {
  email: 'sujal@gmail.com',
  age: 15,
};

// instantiate validator
const validator = new Validator();

// validate
const errors = validator.validate({
  email: '',
  age: 15,
});

// log the errors
console.log(errors);