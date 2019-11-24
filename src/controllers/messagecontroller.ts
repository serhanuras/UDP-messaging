import express from 'express';
import {body, validationResult } from 'express-validator';

import FeedService from '../services/messageservice';
import IMessageService from '../interfaces/imessageservice';
import IMessage from '../interfaces/imessage';
import {MessageType} from '../models/messagetype';
import Message from '../models/message';
import { NextFunction } from 'connect';
import WebApiException from '../exceptions/webapiexception';

class MessageController {

    private messageService:IMessageService;
    public router = express.Router();
    public path = '/message';

    constructor(){
        this.intializeRoutes();
        this.messageService = new FeedService();
    }

    public intializeRoutes() {
        
        this.router.get(
                this.path  + "/:queryType", 
                this.getAllMessages);

        this.router.post(
                this.path, 
                [

                    body('payload').trim()
                                   .not()
                                   .isEmpty()
                ],
                this.sendMessage);

        this.router.delete(
            this.path + "/:deleteType",
            this.deleteMessages);
      }


    getAllMessages = (request: express.Request, response: express.Response, next:NextFunction)=>{
        const queryType = request.params.queryType; 

        this.messageService.getAllMessages(queryType)
            .then(messages=>{
                response.send(messages);     
            })
            .catch(err=>next(err));
        
    }


    sendMessage = (request: express.Request, response: express.Response, next:NextFunction)=>{

        try{
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                throw new WebApiException(402, 'Missing inputs...');
            }


            let message:IMessage = new Message();
            const payload:string = request.body.payload;
            const type:MessageType = MessageType.Post;

            message.payload = payload;
            message.type = type;

            message = this.messageService.sendMessage(message);

            response.send(message);
        }
        catch(err)
        {
            next(err);
        }

    }

    deleteMessages = (request:express.Request, response:express.Response, next:NextFunction)=>{
        
        const deleteType:string = request.params.deleteType;

        this.messageService.deleteMessages(deleteType);

        response.send({message:'succeed'});

    }

}

export default MessageController;