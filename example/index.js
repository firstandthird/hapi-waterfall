var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8080
});

server.register(require('../'), function(err) {

  server.plugins.waterfall.addHelper('getWeather', function(request, date, reply) {
    reply(null, request, date, 'nice');
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      waterfall: [
        function(request, reply) {
          reply(null, request, new Date());
        },
        'getWeather',
        function(request, date, weather, reply) {
          reply('Todays date is ' + date + ' and the weather is ' + weather);
        }
      ]
    }
  });

  server.start(function() {
    server.log(['server', 'info'], 'Hapi server started '+ server.info.uri);

    console.log('registered hepers');
    console.log(server.plugins.waterfall.getHelpers());
  });
});
