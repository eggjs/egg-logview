'use strict';

module.exports = {
  write: true,
  prefix: '^',
  test: [
    'test',
    'benchmark',
  ],
  devdep: [
    'egg',
    'egg-ci',
    'egg-bin',
    'autod',
    'eslint',
    'eslint-config-egg',
    'supertest',
    'intelli-espower-loader',
    'power-assert',
    'webstorm-disable-index',
  ],
  exclude: [
    './test/fixtures',
    './docs',
    './coverage',
  ],
  registry: 'https://r.cnpmjs.org',
};
