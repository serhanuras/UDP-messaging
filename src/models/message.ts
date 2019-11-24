import mongoose, { Schema } from 'mongoose';
import IMessage from '../interfaces/imessage';

const MessageSchema: Schema = new Schema({
    senderAppName : {type:String, required:true,},
    senderAddress: { type: String, required: true },
    recieverAddress: { type: String, required: true },
    payload: { type: String, required: true },
    creationTime: { type: Date, required: true },
    type : {type:String, required:true}
  });

  
 export default mongoose.model<IMessage>('Message', MessageSchema);