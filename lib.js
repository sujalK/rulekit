class Validator
{
  /**
   * v2: extract methods
   * This is better than previous validate()
   * because validation logic is separated into methods as presented below
   * (but there iis still a problem):
   * (
   *
   *   Problem: Every new rule requires modifying the validator,
   *   suppose we want: maxLength
   *
   *   maxLength(value, maximum) { ... }
   *
   *   the central class continues growing
   *
   *   This is the problem that leads us to the Rule abstraction.
   *
   * )
   */

  required(value) {
    if (!value) {
      return 'This field is required';
    }
  }

  email(value) {
    if (!String(value).includes('@')) {
      return 'Invalid email';
    }

    return null;
  }

  min(value, minimum) {
    if (value < minimum) {
      return `Must be at least ${minimum}`;
    }

    return null;
  }


  validate (user) {
    const errors = {};

    // Validator knowing email exists in the user object
    if (!user.email) {
      errors.email = ['Email is required'];
    }

    // Validator knowing age exists in the user object
    if (user.age < 18) {
      errors.age = ['Age must be at least 18'];
    }

    return errors;
  }
}


