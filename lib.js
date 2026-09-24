class Validator
{
  /**
   * v1: this is intentionally bad architecture
   */

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


