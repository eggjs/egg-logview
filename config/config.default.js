'use strict';

module.exports = () => {
  const config = {};
  /**
   * logview default config
   * @member Config#logview
   * @property {String} prefix - logview route prefix, default to `__logs`
   * @property {String} dir - logview dir, default to `path.dirname(app.config.logger.dir)`
   * @property {String} staticHost - static resource host, default to `https://unpkg.cnpmjs.org`
   */
  config.logview = {
    prefix: '__logs',
    dir: undefined,
    staticHost: 'https://unpkg.cnpmjs.org',
  };

  return config;
};
