'use strict'

module.exports = {
  pkg: {
    name: require('../../package').name + '-test'
  },
  api: {
  },
  config: {
    errors: {

    },
    main: {
      spools: [
        require('../../dist').ErrorsSpool
      ]
    }
  }
}


