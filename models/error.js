var resourceful = require('resourceful'),
    config      = {};

if(process.env.COUCHDB_URI) {
  config.uri  = process.env.COUCHDB_URI;
  config.auth = { username: process.env.COUCHDB_USR, password: process.env.COUCHDB_PWD };
}
else {
  config.database = 'test';
}

resourceful.use('couchdb', config);

var ErrorModel = module.exports = resourceful.define('error', function() {
  this.string('name');
  this.string('description');
  this.string('cause');
  this.string('solution');

  this.number('reputation');
});
