# rulekit

A tiny JavaScript validation sketch, showing how I move from a first, naive design to a more extensible one.

> **Status: planning-stage prototype, not production-ready.**
> I built this in under an hour of hands-on time, in a couple of short sessions, to show how I approach a design problem. The focus is on structure and reasoning, not on complete or correct validation. Please don't use it in real projects.

## Why this exists

I built this for a Developer Relations application, to answer the question "What algorithm have you implemented that you are most happy with, and what problems does it still have?"

The interesting part isn't the validation logic itself. It's the refactor. I kept both versions of the design in the repo on purpose so that you can compare them.

## Quick start

There's no build step and there are no dependencies.

1. Clone the repo.
2. Open `index.html` in a browser.
3. Open the developer console to see the validation result.

To try your own rules, edit the schema or the data in `script.js` and refresh the page.

## How it works

Three small building blocks:

| Piece | Responsibility |
|---|---|
| `Rule` (in `Rule/`) | Checks one value. Returns an error message, or `null` if the value is valid. |
| `Field` (`Field.js`) | A field name plus a list of rules. Runs every rule and collects the errors. |
| `Schema` (`Schema/Schema.js`) | A list of fields. Looks up each field's value in the data and validates it. |

Example from `script.js`:

```js
const schema = new Schema([
  new Field('email',    [new RequiredRule(), new EmailRule()]),
  new Field('age',      [new RequiredRule(), new MinRule(18)]),
  new Field('username', [new RequiredRule(), new StringRule()]),
]);

console.log(schema.validate({
  email: 'test@gmail.com',
  age: 10,
}));
// -> errors for `age` (under 18) and `username` (missing)
```

The core loop, written out in `algorithm.txt`:

```text
for each field in schema:
    value = data[field.name]
    for each rule in field:
        error = rule.validate(value)
        if error: add it to errors[field.name]
return errors
```

## Adding a new rule

Create a class with a `validate(value)` method that returns an error string or `null`:

```js
class MaxLengthRule {
  constructor(max) { this.max = max; }

  validate(value) {
    return String(value).length > this.max
      ? `Must be at most ${this.max} characters`
      : null;
  }
}
```

Load it in `index.html` before `script.js`, then use it in a `Field`. You don't have to change `Schema` or `Field`. That's the whole point of the redesign.

## How the design evolved

1. **v1: one validator that knows everything.** `validate(user)` hard-coded checks for `user.email` and `user.age`. It couldn't be reused for other data.
2. **v2: extracted methods** (`lib.js`, still in the repo). `required()`, `email()` and `min()` became separate methods, but every new rule still meant editing the same central class.
3. **v3: rule objects** (current). Each check is its own `Rule` class, `Field` groups rules, and `Schema` groups fields. New behaviour means adding a new class instead of modifying an existing one.

`lib.js` is kept only for comparison. `script.js` doesn't use it.

The feature branches (`feature/extract-methods`, `feature/contract`, `feature/field`, `feature/schema`) show these steps one at a time.

## Known limitations

I left these out on purpose to stay inside the time box:

- **Validation is shallow.** `EmailRule` only checks for `@`, and `RequiredRule` and `MinRule` are minimal.
- **No nested objects or arrays**, and no cross-field rules such as "required if another field is set".
- **Errors are plain strings.** There are no error codes, no machine-readable output, and no translations.
- **No option to stop at the first error.** Every rule always runs.
- **No tests, no package and no module system.** Scripts are loaded as browser globals through `<script>` tags, in a fixed order.
- **No async rules**, for example "is this username already taken?".

## What I'd do next

In rough order of value for a developer using it:

1. Add a test suite (for example Vitest) covering each rule and the `Schema` loop.
2. Switch to ES modules and publish to npm, so it works in Node and bundlers without relying on `<script>` order.
3. Return structured errors (`{ field, rule, message }`) so UIs and APIs can use them.
4. Support nested schemas and conditional rules.
5. Add TypeScript types so editors can autocomplete rule options.
6. Remove `lib.js` from `main` and move the before/after story into a short walkthrough article.

## Developer experience notes

I asked myself: "What would confuse someone opening this repo for the first time?"

- Two classes both called `validate` (the old `Validator` and the new `Schema`) would confuse newcomers without this README.
- Having to load scripts in a fixed order in `index.html` is fragile. ES modules would fix it.
- There's no single "hello world" snippet you can paste into a terminal. An npm package with a Node example would give one.
