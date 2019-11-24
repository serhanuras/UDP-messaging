import dgram from 'dgram';
import Message from '../models/message';
import IMessage from '../interfaces/imessage'
import ip from 'ip';
import EnvoirementVariables from '../utils/envoirementvariables';

export default class UdpClient
{
    private static client:dgram.Socket;
    private static _recieverPort:number;
    private static _recieverHost:string;
    

    public static sendMessage=(message:IMessage)=>{

        UdpClient.client = dgram.createSocket('udp4');    
        UdpClient._recieverPort = EnvoirementVariables.UDP_RECEIVER_PORT;
        UdpClient._recieverHost = EnvoirementVariables.UDP_RECEIVER_HOST

        message.recieverAddress = `${UdpClient._recieverHost}:${UdpClient._recieverPort}`;
        message.senderAddress = ip.address();
        message.senderAppName = EnvoirementVariables.APPLICATION_NAME;


        if(process.env.SenderAppName){
            message.senderAppName = process.env.SenderAppName;
        }

        let bufferedMessage = new Buffer(JSON.stringify(message));


        if(UdpClient._recieverHost=='localhost'){
        
            UdpClient.client.send(bufferedMessage, 0, bufferedMessage.length, UdpClient._recieverPort, function(err, bytes) {
                if (err) throw err;
                console.log(`UDP message sent to 0.0.0.0:${UdpClient._recieverPort}...`);
                UdpClient.client.close();
                
            });
        }
        else{
            UdpClient.client.send(bufferedMessage, 0, bufferedMessage.length, UdpClient._recieverPort, UdpClient._recieverHost, function(err, bytes) {
                if (err) throw err;
                console.log(`UDP message sent to ${UdpClient._recieverHost}:${UdpClient._recieverPort}...`);
                UdpClient.client.close();
                
            });
        }
    }
}