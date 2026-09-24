class RequiredRule extends Rule
{
  validate(value) {
    if (value === undefined || value === null || value === '') {
      return 'This field is required';
    }

    // Returning null, because we're establishing a valid simple contract:
    // null   -> valid
    // string -> invalid
    // we could eventually use proper ValidationError object, but that's unnecessary
    // complexity for our first version of building this validator
    return null;
  }
}