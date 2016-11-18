'use strict';

const fs = require('fs');
const path = require('path');
const utils = require('../../lib/utils');

module.exports = (options, app) => {
  const prefix = options.prefix;
  const loggerDir = options.dir || path.dirname(app.config.logger.dir);
  const tplPath = path.join(__dirname, '../../app/public/view.html');
  const tpl = fs.readFileSync(tplPath, 'utf-8')
      .replace(/CONFIG_PREFIEX/g, prefix).replace(/CONFIG_HOST/g, options.staticHost);

  app.logger.info(`[egg-logview] mount log ${loggerDir} at http://127.0.0.1:7001/${prefix}`);

  return function* logviewMiddleware(next) {
    if (this.path.indexOf(`/${prefix}`) !== 0) {
      return yield next;
    }

    if (this.path === `/${prefix}`) {
      this.body = tpl;
    } else if (this.path === `/${prefix}/files`) {
      this.body = yield utils.listDir(loggerDir, 3);
    } else {
      const filePath = this.path.substring(`/${prefix}/file/`.length);
      this.body = yield utils.readFile(filePath, loggerDir);
    }
  };
};
