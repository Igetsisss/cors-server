const { onRequest } = require('firebase-functions/v2/https');
const corsAnywhere = require('cors-anywhere');
const cors = require('cors');

const corsServer = corsAnywhere.createServer({
    originWhitelist: [
      'http://food.jackunderwood.org',
      'https://food.jackunderwood.org',
      'https://portfolio-ravenous.web.app',
      'https://portfolio-ravenous.firebaseapp.com'
    ],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
});

const corsHandler = cors({ origin: true });

exports.proxy = onRequest((request, response) => {
    corsHandler(request, response, () => {
      corsServer.emit('request', request, response);
    })
});
