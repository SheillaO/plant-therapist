require('dotenv/config');
const app = require('./app.js');

const port = 3000;
app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
  console.log(`Server listening on port ${port}`);
});
