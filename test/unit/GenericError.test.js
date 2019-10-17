'use strict'
/* global describe, it */
const assert = require('assert')
const GenericError = require('../../dist').errors.GenericError
const Joi = require('joi')

describe('GenericError', () => {
  it('should throw a 400', () => {
    const err = new GenericError('E_BAD_REQUEST', 'bad request')
    console.log(err)
    assert(err instanceof GenericError)
    assert(err.message, 'bad request')
    assert(err.code, 'E_BAD_REQUEST')
    assert(err.name, 'Generic Error')
    assert(err.statusCode, '400')
  })

  it('should throw a 403', () => {
    const err = new GenericError('E_FORBIDDEN', 'not allowed')
    console.log(err)
    assert(err instanceof GenericError)
    assert(err.message, 'not allowed')
    assert(err.code, 'E_FORBIDDEN')
    assert(err.name, 'Generic Error')
    assert(err.statusCode, '403')
  })

  it('should throw a 404', () => {
    const err = new GenericError('E_NOT_FOUND', 'not found')
    console.log(err)
    assert(err instanceof GenericError)
    assert(err.message, 'not found')
    assert(err.code, 'E_NOT_FOUND')
    assert(err.name, 'Generic Error')
    assert(err.statusCode, '404')
  })

  it('should throw a 500', () => {
    const err = new GenericError()
    console.log(err)
    assert(err instanceof GenericError)
    assert(err.message, 'internal error')
    assert(err.code, 'E_UNSPECIFIED')
    assert(err.name, 'Generic Error')
    assert(err.statusCode, '500')
  })

  it('should throw validation error', () => {

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

    const { error } = schema.validate({})

    console.log(error)
    // console.log(error.annotate())
    const err = new GenericError(error)
    console.log(err)
  })
})
