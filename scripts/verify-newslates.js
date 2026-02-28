const http = require('http');

async function run() {
  const data = JSON.stringify({ email: `test+${Date.now()}@example.com`, name: 'Dev Test', source: 'script' });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/newslates',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
  };

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => (body += chunk));
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      try {
        console.log('Response:', JSON.parse(body));
      } catch (e) {
        console.log('Response (raw):', body);
      }
    });
  });

  req.on('error', (err) => {
    console.error('Request error:', err.message);
  });

  req.write(data);
  req.end();
}

run();
