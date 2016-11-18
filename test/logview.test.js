'use strict';

const request = require('supertest');
const mm = require('egg-mock');

describe('test/logview.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/logview',
    });
    return app.ready();
  });

  after(() => app.close());

  afterEach(mm.restore);

  it('should GET /', () => {
    return request(app.callback())
    .get('/')
    .set('Accept', 'application/json')
    .expect('hi, logview')
    .expect(200);
  });

  it('should GET /__logs', () => {
    return request(app.callback())
    .get('/__logs')
    .set('Accept', 'application/json')
    .expect(/vue/)
    .expect(200);
  });

  it('should GET /__logs/files', () => {
    return request(app.callback())
    .get('/__logs/files')
    .set('Accept', 'application/json')
    .expect(/logview-web\.log/)
    .expect(200);
  });

  it('should GET /__logs/file/logview/logview-web.log', () => {
    return request(app.callback())
    .get('/__logs/file/logview/logview-web.log')
    .expect(/\[egg-logview] mount log/)
    .expect(200);
  });

});
