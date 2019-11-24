import dgram from 'dgram';
import EnvoirementVariables from '../utils/envoirementvariables';
import IMessage from '../interfaces/imessage';
import {MessageType} from '../models/messagetype';
import Message from '../models/message';
import MessageService from '../services/messageservice';

export default class UdpServer
{
    private static _server:dgram.Socket;
    private static _port:number;


    public static listen = () => {

        UdpServer._port = EnvoirementVariables.UDP_SERVER_PORT;

        if(!UdpServer._server){
            UdpServer._server = dgram.createSocket('udp4');

            UdpServer._server.on('listening', function(){
                console.log(`UDP Server started and listening at ${UdpServer._server.address().address}:${UdpServer._server.address().port}...`);
            });

            // When udp server receive message.
            UdpServer._server.on('message', function(data:string) {
                let output:string;

                let tempMessage:IMessage = JSON.parse(data);
                const feedService:MessageService = new MessageService();

                let message:IMessage = new Message();
                message._id = tempMessage._id;
                message.senderAppName = tempMessage.senderAppName;
                message.senderAddress = tempMessage.senderAddress;
                message.recieverAddress = tempMessage.recieverAddress;
                message.payload = tempMessage.payload;
                message.creationTime = tempMessage.creationTime;
                message.type = tempMessage.type;

                if(message.payload){

                    if(message.type == MessageType.Post){

                        output = `Udp server recieve POST TYPE message : ${data} \n`;
                        console.log(output);

                        //SAVE MESSAGE 
                        feedService.saveMessageToDb(message).then((message)=>{

                            //SEND ACKNOWLEDGE
                            message.type = MessageType.Acknowledge;
                            feedService.sendMessage(message);
                        });
                    }
                    else if(message.type == MessageType.Acknowledge){
                        //UPDATE THE STATUS OF MESSAGE

                        output = `Udp server recieve ACKNOWLEDGE TYPE message : ${data} \n`;
                        console.log(output);

                        feedService.setAcknowledgeFlagToDb(tempMessage._id);
                    }
                    else{
                        //INVALI MESSAGE FORMAT...
                        output = `Udp server recieve INVALID MESSAGE TYPE : ${data} \n`;
                        console.log(output);
                    }
                }
                else{
                    output = `Udp server recieve INVALID DATA : ${data} \n`;
                    console.log(output);
                }
            });

            UdpServer._server.on('error',function(error){
                console.log('Error: ' + error);
                UdpServer._server.close();
            });

            UdpServer._server.bind(UdpServer._port);
        }

    }


}