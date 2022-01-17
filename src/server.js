import 'dotenv/config';
import server from './app.js';

const port = process.env.PORT ?? 5000;

server.listen(port, () => {
  console.log(`Start server on port ${port}! :D`);
});
