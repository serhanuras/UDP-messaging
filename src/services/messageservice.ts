import IMessage from '../interfaces/imessage';
import IMessageService from '../interfaces/imessageservice'
import Message from '../models/message';
import { MessageType } from '../models/messagetype';
import UdpClient from '../modules/udpclient';
import EnvoirementVariable from '../utils/envoirementvariables';
import MessageServiceException from '../exceptions/messageserviceexception';

export default class MessageService implements IMessageService {


    public async getAllMessages(queryType?:string):Promise<{message:IMessage[], count:number}>{

        let message:IMessage[];

        if(!queryType)
          throw new MessageServiceException(100, "Invalid queryType...");

        //MESSAGE THAT ARE RECEIVED
        if(queryType=="0")
          message = await  Message.find({'senderAppName': { $ne: EnvoirementVariable.APPLICATION_NAME  }});
        //MESSAGE THAT ARE SENT
        else if(queryType=="1")
          message = await  Message.find({'senderAppName': EnvoirementVariable.APPLICATION_NAME });
        else
          throw new MessageServiceException(101, "Invalid queryType...");

        return {message, count:message.length};
    }


    public sendMessage(message:IMessage):IMessage{

          if(message.payload.trim()==="")
            throw new MessageServiceException(200, "Invalid payload...");

          message.creationTime = new Date();
          UdpClient.sendMessage(message);
        
          return message;
    }

    public async saveMessageToDb(message:IMessage):Promise<IMessage>{

        if(message.recieverAddress.trim()=='' ||
           message.senderAddress.trim()=='' ||
           message.type==undefined ||
           message.creationTime == undefined ||
           message.payload.trim()==''  ||
           message.senderAppName=='')
        {
          throw new MessageServiceException(300, "Invalid message...");
        }

        await message.save();
        return message;

    }


    public  setAcknowledgeFlagToDb(_id:any) {

        if(_id.trim()==='')
          throw new MessageServiceException(400, "Invalid _id...");

        Message.findById(_id).then(message=>{
          if(message){
            message.type = MessageType.Acknowledge;
            message.save();
          }
        }); 

    }

    public deleteMessages(deleteType:string):void{

        if(deleteType.trim()=='')
          throw new MessageServiceException(500, "Invalid deleteType...");

        //DELETE RECEIVED MESSAGES
        if(deleteType=="0"){
          console.log(4)
          Message.remove({'senderAppName': { $ne: EnvoirementVariable.APPLICATION_NAME  }}).exec();
        }
        //DELETE SEND MESSAGES
        else if(deleteType=="1"){
          console.log(3)
          
          Message.remove({'senderAppName':  EnvoirementVariable.APPLICATION_NAME}).exec();

        }
        //DELETE ALL
        else if(deleteType=="2"){
          console.log(2)
          Message.remove({}).exec();
        }
        else{
          throw new MessageServiceException(501, "Invalid deleteType...");
        }
        
    }

}