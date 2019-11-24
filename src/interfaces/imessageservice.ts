import IMessage from './imessage';

export default interface IMessageService{

    getAllMessages(queryType:string):Promise<{message:IMessage[], count:number}>;

    sendMessage(message:IMessage):IMessage;

    saveMessageToDb(message:IMessage):Promise<IMessage>;

    setAcknowledgeFlagToDb(_id:any):void;

    deleteMessages(deleteType:string):void;

}