### hapi-waterfall

#### Installation

```
npm install hapi-waterfall --save
```

#### Usage

```js
server.register(require('hapi-waterfall'), function(err) {
  //do stuff
});

server.route({
  method: 'GET',
  path: '/',
  handler: {
    waterfall: [
      function(request, reply) {
        reply(null, request, new Date());
      },
      'getWeather', //Named helper from addHelper()
      function(request, date, weather, reply) {
        reply('Todays date is ' + date + ' and the weather is ' + weather);
      }
    ]
  }
});
```

[See the async docs for waterfall](https://github.com/caolan/async#waterfall). All functions behave like normal waterfall methods with the exception of the last which acts like a normal hapi handler.

#### Methods

```js
server.plugins.waterfall.addHelper('getWeather', function(request, reply) {
  reply(null, 'nice');
});

var registeredMethods = server.plugins.waterfall.getHelpers();
```
