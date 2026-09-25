class StringRule extends Rule
{
  validate(value) {
    if (Object.prototype.toString.call(value) !== '[object String]') {
      return 'Must be a string';
    }
    
    return null;
  }
}