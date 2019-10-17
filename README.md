# spool-errors

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

:package: Errors Spool

A Spool to extend Fabrix with Standard Errors

## Install
```sh
$ npm install --save @fabrix/spool-errors
```

## Configure

```js
// config/main.ts
import { ErrorsSpool } from '@fabrix/spool-errors'
export const main = {
  spools: [
    // ... other spools
    ErrorsSpool
  ]
}
```

## Configuration

You can easily extend the generic errors

```js
// config/errors.ts
import { GenericError } from '@fabrix/spool-error/errors'
export const errors = {
  TestError: class TestError extends GenericError {}
}
```

## Usage
Use spool-errors to standardize Joi errors

```js
const schema = Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      })


const test = schema.validate({})

const { value, error } = this.app.testJoiError(test, TestError)

if (error) {
  assert(error instanceof TestError)
  throw error
}
else {
  // do something with value
}
```


[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-errors.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-errors
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-errors/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-errors/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-errors.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-errors
[gitter-image]: http://img.shields.io/badge/+%20GITTER-ERRORSN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/fabrix
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-errors.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-errors/coverage

