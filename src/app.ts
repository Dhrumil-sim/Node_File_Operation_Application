import express, { Application } from 'express';
class App {
  public app: Application;
  constructor() {
    this.app = express();
  }
  private setMiddleWares(): void {
    this.app.use(express.json({ limit: '16kb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static('public'));
    this.app.set('view engine', 'ejs');
  }

  private setRoutes(): void {}

  public getServer(): Application {
    return this.app;
  }
}

export default new App().getServer();
