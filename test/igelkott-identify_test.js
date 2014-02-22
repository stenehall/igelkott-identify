var assert = require('chai').assert,
Stream = require('stream'),
Igelkott    = require('igelkott'),
Connect = require('../igelkott-identify.js').Plugin;

describe('Identify', function() {

  it('Should emit NICK on connect', function(done) {

    var igelkott,
    config,
    s,
    server;

    s = new Stream.PassThrough({objectMode: true});

    config = {
      plugins: {},
      server: {nick: 'foobar' },
      'adapter': s, 'connect': function() { this.server.emit('connect'); }
    };

    igelkott = new Igelkott(config);
    igelkott.plugin.load('connect', {}, Connect);

    igelkott.on('NICK', function(message) {
      assert.equal(message.parameters[0], this.config.server.nick);
      done();
    });
    igelkott.connect();
  });
});
