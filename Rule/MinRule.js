class MinRule extends Rule
{
  constructor(minimum) {
    super();

    this.minimum = minimum;
  }

  validate(value)
  {
    if (value === undefined || value === null || value === '') {
      return null;
    }

    if (value < this.minimum) {
      return `Must be at least ${this.minimum}`;
    }

    return null;
  }
}