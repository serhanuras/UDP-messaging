import { MessageType } from '../models/messagetype';
import {  Document } from 'mongoose';

export default interface IMessage extends Document{

    senderAppName: string;
    senderAddress: string;
    recieverAddress : string;
    payload: string;
    creationTime: Date;
    type : MessageType;

}