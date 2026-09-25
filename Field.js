class Field
{
  constructor (name, rules)
  {
    this.name  = name;
    this.rules = rules;
  }

  validate(value)
  {
    const errors = [];

    for (const rule of this.rules) {
      const error = rule.validate(value);

      if (error !== null) {
        errors.push(error);
      }
    }

    return errors;
  }
}