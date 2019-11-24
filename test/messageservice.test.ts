import 'mocha';
import {expect} from 'chai';
import MessageService from '../src/services/messageservice';
import Message from '../src/models/message';
import {MessageType} from '../src/models/messagetype';
import IMessageService from '../src/services/messageservice';
import MessageServiceException from '../src/exceptions/messageserviceexception';
import mongoose from 'mongoose';
import EnvoirementVariables from '../src/utils/envoirementvariables';
import IMessage from '../src/interfaces/imessage';


let messageService:IMessageService = new MessageService();


before(async () => {  
    await mongoose.connect(EnvoirementVariables.MONGODB_CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true });
});

describe('MessageService.GetAllMessages()',()=>{

    context('without arguments', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                messageService.getAllMessages();
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })

    context('without arguments', ()=>{
        it('should return Invalid queryType...', ()=>{
            
            try {
                messageService.getAllMessages();
            }
            catch(err){
                expect(err.message).to.equal('Invalid queryType...');
            }
        });
    })

    context('sending no expected argument', ()=>{
        it('should return Invalid queryType...', ()=>{
            
            try {
                messageService.getAllMessages("2");
            }
            catch(err){
                expect(err.message).to.equal('Invalid queryType...');
            }
        });
    })

    context('sending 1 as a argument', ()=>{
        it('should return Message Object...', ()=>{

            messageService.getAllMessages("1").then(obj=>{
            expect(obj.message).to.instanceOf(Message);
           })           
        });
    })


});


describe('MessageService.sendMessage()',()=>{

    context('with empty payload', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                message.payload = '';
                messageService.sendMessage(message);
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })
    
    context('with more than one space character included payload', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                message.payload = '         ';
                messageService.sendMessage(message);
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })

    context('sending valid payload', ()=>{
        it('should return Message Object...', ()=>{

           const message:IMessage = new Message();
                message.payload = 'Hello World !';
            const obj =    messageService.sendMessage(message);
            expect(obj).to.instanceOf(Message);
        });
    })
});


describe('MessageService.saveMessageToDb()',()=>{

    context('with empty recieverAddress', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                message.recieverAddress = '';
                message.senderAppName = '1';
                message.type = MessageType.Post;
                message.payload = '1';
                message.creationTime = new Date();
                message.senderAddress = '1';
                messageService.sendMessage(message);
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })

    context('with recieverAddress has more than one space character', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                message.recieverAddress = '     ';
                message.senderAppName = '1';
                message.type = MessageType.Post;
                message.payload = '1';
                message.creationTime = new Date();
                message.senderAddress = '1';
                messageService.sendMessage(message);
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })


    context('with empty senderAppName', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                message.recieverAddress = '1';
                message.senderAppName = '';
                message.type = MessageType.Post;
                message.payload = '1';
                message.creationTime = new Date();
                message.senderAddress = '1';
                messageService.sendMessage(message);
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })

    context('with senderAppName has more than one space character', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                message.recieverAddress = '1';
                message.senderAppName = '    ';
                message.type = MessageType.Post;
                message.payload = '1';
                message.creationTime = new Date();
                message.senderAddress = '1';
                messageService.sendMessage(message);
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })


    context('with undefiend type', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                message.recieverAddress = '1';
                message.senderAppName = '';
                message.payload = '1';
                message.creationTime = new Date();
                message.senderAddress = '1';
                messageService.sendMessage(message);
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })
    
    context('with empty payload', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                message.recieverAddress = '1';
                message.senderAppName = '1';
                message.type = MessageType.Post;
                message.payload = ' ';
                message.creationTime = new Date();
                message.senderAddress = '1';
                messageService.sendMessage(message);
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })

    context('with payload has more than one space character', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                message.recieverAddress = '1';
                message.senderAppName = '1';
                message.type = MessageType.Post;
                message.payload = '    ';
                message.creationTime = new Date();
                message.senderAddress = '1';
                messageService.sendMessage(message);
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })

    context('with empty senderAddress', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                message.recieverAddress = '1';
                message.senderAppName = '1';
                message.type = MessageType.Post;
                message.payload = '1';
                message.creationTime = new Date();
                message.senderAddress = ' ';
                messageService.sendMessage(message);
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })

    context('with senderAddress has more than one space character', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                message.recieverAddress = '1';
                message.senderAppName = '1';
                message.type = MessageType.Post;
                message.payload = '1';
                message.creationTime = new Date();
                message.senderAddress = '    ';
                messageService.sendMessage(message);
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })

    
    context('with undefiend creationTime', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                message.recieverAddress = '1';
                message.senderAppName = '';
                message.payload = '1';
                message.type = MessageType.Post;
                message.senderAddress = '1';
                messageService.sendMessage(message);
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })
  
    context('sending valid message', ()=>{
        it('should return Message Object...', ()=>{

            const message:IMessage = new Message();
            message.recieverAddress = '1';
            message.senderAppName = '1';
            message.payload = '1';
            message.type = MessageType.Post;
            message.senderAddress = '1';
            const obj = messageService.sendMessage(message);

            expect(obj).to.instanceOf(Message);
        });
    })
  
});


describe('MessageService.setAcknowledgeFlagToDb()',()=>{

    context('with empty _id', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                messageService.setAcknowledgeFlagToDb('');
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })

    context('with _id has more than one space character', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                messageService.setAcknowledgeFlagToDb('    ');
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })
    

    context('sending valid _id', ()=>{
        it('should not throw exception...', ()=>{

            try {
                const message:IMessage = new Message();
                messageService.setAcknowledgeFlagToDb('5dd9c7b57f76fb000729645a');

                expect(true).to.be.true;
            }
            catch(err){
                expect(true).to.be.false;
            }
        });
    })
});

describe('MessageService.deleteMessages()',()=>{


    context('with deleteType has more than one space character', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                messageService.deleteMessages('    ');
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })

    context('with invalid deleteType', ()=>{
        it('should return MessageServiceException', ()=>{
            
            try {
                const message:IMessage = new Message();
                messageService.deleteMessages('3');
            }
            catch(err){
                expect(err).to.instanceOf(MessageServiceException);
            }
        });
    })
    

    context('sending valid deleteType', ()=>{
        it('should not throw exception...', ()=>{

            try {
                const message:IMessage = new Message();
                messageService.deleteMessages('1');

                expect(true).to.be.true;
            }
            catch(err){
                expect(true).to.be.false;
            }
        });
    })
});