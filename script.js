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
// console.log(errors);

// Using Field for validation: so here, we're creating 'email' field; and RequiredRule as well as the EmailRule are rules that needs to be applied for this 'email' field to perform validation
// const emailField = new Field ( 'email', [
//   new RequiredRule(),
//   new EmailRule(),
// ]);
//
// // logs: ['invalid email']
// console.log(emailField.validate('test'));

// Utilizing Schema
const schema = new Schema([
  new Field('email', [
    new RequiredRule(),
    new EmailRule()
  ]),
  // Add new Field
  new Field('age', [
    new RequiredRule(),
    new MinRule(18),
  ]),

  // Add another Field
  new Field ('username', [
    new RequiredRule(),
    new StringRule(),
  ]),
]);

console.log(schema.validate({
  email: 'test@gmail.com',
  age: 10,
}));

