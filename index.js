var async = require('async');
var _ = require('lodash-node');

var helpers = {};

exports.register = function(plugin, opts, next) {

  plugin.handler('waterfall', function(route, options) {

    return function(request, reply) {
      var waterfall = _.map(options, function(call) {
        if (typeof call === 'string') {
          call = helpers[call];
        }

        return call;
      });

      waterfall.unshift(function(done) {
        done(null, request);
      });

      async.waterfall(waterfall, function(err, results) {
        if (err) {
          return reply(err);
        }

        reply(results);
      });
    };

  });

  plugin.expose('addHelper', function(helperName, method) {
    helpers[helperName] = method;
  });

  plugin.expose('getHelpers', function() {
    return helpers;
  });

  next();
};

exports.register.attributes = {
  name: 'waterfall'
};
