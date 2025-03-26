import express, { Application } from 'express';
class App {
  public app: Application;
  constructor() {
    this.app = express();
  }
  public getServer(): Application {
    return this.app;
  }
}

export default new App().getServer();
