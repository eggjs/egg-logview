'use strict';

module.exports = app => {
  app.config.coreMiddlewares.push('logview');
};
