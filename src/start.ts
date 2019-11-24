import WebApi from './modules/webapi';
import UdpServer from './modules/udpserver';
import MessageController from './controllers/messagecontroller';
import EnvoirementVariables from './utils/envoirementvariables';

import * as dotenv from "dotenv";


async function startApp()
{

    let webApiPort:number = EnvoirementVariables.WEB_API_PORT;
   
   
    //Wake Up Web Api....
    const webapi = new WebApi(
      [
        new MessageController(),
      ],
      webApiPort,
    );

    const isWebApiStarted:boolean = await webapi.listen();

    //Wake Up UDP Server
    if(isWebApiStarted)
      UdpServer.listen();
}

startApp();



