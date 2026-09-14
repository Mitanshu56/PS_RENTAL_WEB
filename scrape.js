const https = require('https');

https.get('https://share.google/EENq8RhbSWCZ7NRGX', (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    https.get(res.headers.location, (res2) => {
      let data = '';
      res2.on('data', chunk => data += chunk);
      res2.on('end', () => console.log(data.substring(0, 1500)));
    });
  }
});
