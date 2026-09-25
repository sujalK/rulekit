class Schema
{
  constructor(fields)
  {
    this.fields = fields;
  }

  /**
   * Keeping the validation algorithm here inside this method
   */
  validate(data)
  {
    const errors = {};

    for (const field of this.fields) {
      const value       = data[field.name];
      const fieldErrors = field.validate(value);

      if (fieldErrors.length > 0) {
        errors[field.name] = fieldErrors;
      }
    }

    return errors;
  }
}