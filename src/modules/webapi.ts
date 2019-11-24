import express from 'express';
import bodyParser from 'body-parser';
import { NextFunction } from 'connect';
import WebApiException from '../exceptions/webapiexception';
import mongoose from 'mongoose';
import EnvoirementVariables from '../utils/envoirementvariables';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';


class WebApi {

  public app: express.Application;
  public port: number;
 
  constructor(controllers:any, port:any) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeSwaggerUI();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }
 
  private initializeMiddlewares() {
   
    this.app.use(bodyParser.json());

    
    this.app.use((req:express.Request, res:express.Response, next:NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
      );
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
  }

  private initializeErrorHandling() {
    this.app.use((error:WebApiException, req:express.Request, res:express.Response, next:NextFunction) => {
      const status = error.status || 500;
      const message = error.message || 'Something went wrong';
      res.status(status).json({ message: message });
    });
  }
 
  private initializeControllers(controllers:any) {
    controllers.forEach((controller:any) => {
      this.app.use('/', controller.router);
    });

    this.app.use((req:express.Request, res:express.Response, next:NextFunction)=>{
      res.status(404).json({ message: 'Api Not Found...' });
    });
  }

  private initializeSwaggerUI(){
    this.app.use('/api-docs', swaggerUi.serve);
    this.app.get('/api-docs', swaggerUi.setup(swaggerDocument));
  }
 
  public async listen():Promise<boolean> {

    try{
      await mongoose.connect(EnvoirementVariables.MONGODB_CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true });
      mongoose.set('useCreateIndex', true);

      this.app.listen(this.port, () => {
        console.log(`Web App listening on the port ${this.port}`);
      });

      return true;
    }
    catch(err){
        console.log(err);
        return false;

    }
    
  }
}
 
export default WebApi;