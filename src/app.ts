import express, { Application } from 'express';
import fileRoutes from './routes/file.routes.js';
import path from 'path';
class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.setMiddleWares();
    this.setRoutes();
  }
  private setMiddleWares(): void {
    this.app.use(express.json({ limit: '16kb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(express.static('public'));
    this.app.set('view engine', 'ejs');
    console.log(path.join(__dirname, '../views'));
    this.app.set('views', path.join(__dirname, '../views'));
  }

  private setRoutes(): void {
    this.app.use('/', fileRoutes);
  }

  public getServer(): Application {
    return this.app;
  }
}

export default new App().getServer();
