'use strict'
const GenericError = require('../../dist/errors').GenericError

module.exports = {
  pkg: {
    name: require('../../package').name + '-test'
  },
  api: {
  },
  config: {
    errors: {
      TestError: class TestError extends GenericError {}
    },
    main: {
      spools: [
        require('../../dist').ErrorsSpool
      ]
    }
  }
}


