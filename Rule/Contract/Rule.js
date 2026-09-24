/**
 * This class isn't useful by itself,
 * but it establishes our conceptual interface.
 */
class Rule
{
  validate (value) {
    throw new Error ('Not implemented');
  }
}