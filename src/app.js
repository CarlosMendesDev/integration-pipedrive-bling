import express from 'express';
import router from './routes/DealsRoutes.js';

class App {
  constructor() {
    this.server = express();
    this.server.use(router);
  }
};

export default new App().server;
