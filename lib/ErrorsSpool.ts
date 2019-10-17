import { ExtensionSpool } from '@fabrix/fabrix/dist/common/spools/extension'
import { Utils } from './Utils'

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
      // validator: {
      //   get: () => {
      //     return this.joi
      //   },
      //   set: (newInstances) => {
      //     throw new Error('validator can not be set through FabrixApp, check spool-errors instead')
      //   },
      //   enumerable: true,
      //   configurable: true
      // },
      // validate: {
      //   get: () => {
      //     return this._validate
      //   },
      //   set: (newInstances) => {
      //     throw new Error('validate can not be set through FabrixApp, check spool-errors instead')
      //   },
      //   enumerable: true,
      //   configurable: true
      // }
    }
  }

  /**
   * Validate Configuration
   */
  async validate () {
    if (!this.app.config.get('errors')) {
      return Promise.reject(new Error('No configuration found at config.errors!'))
    }

    return Promise.resolve()
    // return Promise.all([
    //   Utils.validateErrorsConfig(this.app, this.joi, this.app.config.get('errors'))
    // ])
    //   .catch(err => {
    //     return Promise.reject(err)
    //   })
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
