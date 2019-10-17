'use strict'
/* global describe, it, app */
const assert = require('assert')
const Joi = require('joi')
const GenericError = require('../../dist').errors.GenericError

describe('Spool', () => {

  it('should have errors', () => {
    assert(global.app.errors)
    assert.ok(global.app.errors.GenericError)
    assert.ok(global.app.errors.TestError)
  })


  it('should transformJoiError', () => {
    const schema = Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

      password: Joi.string(),
      // .pattern(/^[a-zA-Z0-9]{3,30}$/),

      repeat_password: Joi.ref('password'),

      access_token: [
        Joi.string(),
        Joi.number()
      ],

      birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] }
        })
    })
      .with('username', 'birth_year')
      .xor('password', 'access_token')
      .with('password', 'repeat_password')

    const test = schema.validate({})

    const { value, error } = global.app.transformJoiError(test)

    console.log(error.details)
    assert(error.message, 'child "username" fails because ["username" is required]')
    assert(error instanceof GenericError)
    assert(error.code, 'E_VALIDATION')
    assert(error.name, 'ValidationError')
    assert(error.statusCode, '400')
    assert.ok(error.details)
  })

  it('should transformJoiError with custom error', () => {
    const schema = Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

      password: Joi.string(),
      // .pattern(/^[a-zA-Z0-9]{3,30}$/),

      repeat_password: Joi.ref('password'),

      access_token: [
        Joi.string(),
        Joi.number()
      ],

      birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] }
        })
    })
      .with('username', 'birth_year')
      .xor('password', 'access_token')
      .with('password', 'repeat_password')

    const test = schema.validate({})

    const { value, error } = global.app.transformJoiError(test, global.app.errors.TestError)

    console.log(error.details)
    assert(error.message, 'child "username" fails because ["username" is required]')
    assert(error instanceof global.app.errors.TestError)
    assert(error.code, 'E_VALIDATION')
    assert(error.name, 'ValidationError')
    assert(error.statusCode, '400')
    assert.ok(error.details)
  })
})
