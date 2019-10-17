import { ExtensionSpool } from '@fabrix/fabrix/dist/common/spools/extension'
import { Utils } from './Utils'
import { errors } from './'
import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'

export class ErrorsSpool extends ExtensionSpool {

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })

    this.extensions = {
      errors: {
        get: () => {
          return this.errors
        },
        set: (newInstances) => {
          throw new Error('errors can not be set through FabrixApp, check spool-errors instead')
        },
        enumerable: true,
        configurable: true
      },
      testJoiError: {
        get: () => {
          return this.testJoiError
        },
        set: (newInstances) => {
          throw new Error('hasJoiError can not be set through FabrixApp, check spool-errors instead')
        },
        enumerable: true,
        configurable: true
      }
    }
  }

  get errors() {
    return {
      ...this.app.config.get('errors'),
      ...errors
    }
  }

  testJoiError(evaluate, errorType?) {
    const { value, error } = evaluate
    errorType = errorType || this.errors.GenericError

    if (error) {
      return {
        value,
        error: new errorType(
          'E_VALIDATION',
          error.message,
          error.name,
          error.details,
          '400',
          error.annotate
        )
      }
    }
    return { value, error }
  }

  /**
   * Validate Configuration
   */
  async validate () {
    if (!this.app.config.get('errors')) {
      return Promise.reject(new Error('No configuration found at config.errors!'))
    }

    return Promise.resolve()
  }

  /**
   * Configure Joi
   */
  configure() {
    return Utils.configure(this.app)
  }

  /**
   * Initializer Joi
   */
  async initialize() {
    return Utils.init(this.app)
  }

  /**
   * unload Joi
   */
  async unload() {
    return Utils.unload(this.app)
  }

  async sanity() {
    //
  }
}
