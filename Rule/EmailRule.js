/**
 * While building / creating this class, we can notice that:
 * EmailRule doesn't know anything about:
 * - users
 * - schemas
 * - fields
 * - other rules
 * - the Validator
 *
 * It only knows a value, and return if it's a valid value or not.
 *
 * That's separation of concerns.
 */
class EmailRule extends Rule
{
  validate (value) {
    if (value === undefined || value === null || value === '') {
      return null;
    }

    if (!String(value).includes('@')) {
      return 'Invalid email';
    }

    return null;
  }
}