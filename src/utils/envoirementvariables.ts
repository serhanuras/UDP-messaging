import dotnev from 'dotenv';

export default class EnvoirementVariables {

        private static Config():void
        {       
                dotnev.config();
                let path;
                switch (process.env.APP_TYPE) {
                case "FIRSTAPP":
                        path = `${__dirname}/../../.env.firstapp`;
                        break;
                case "SECONDAPP":
                        path = `${__dirname}/../../.env.secondapp`;
                        break;
                }
                
                dotnev.config({ path: path });
        }
        
        static get WEB_API_PORT():number{
                this.Config();
                let webApiPort = 8089;

                if(process.env.WEBAPI_PORT){
                        webApiPort = parseInt(process.env.WEBAPI_PORT)
                }

                return webApiPort;
        }

        static get UDP_SERVER_PORT():number {
                this.Config();
                let udpServerPort = 8089;
                if(process.env.UDP_SERVER_PORT){
                        udpServerPort = parseInt(process.env.UDP_SERVER_PORT);
                }
                
                return udpServerPort;
        }
        
        static get MONGODB_CONNECTION_STRING():string{
                this.Config();
                let db_connection_string = 'mongodb+srv://suras:147852@cluster0-hilie.mongodb.net/test?retryWrites=true&w=majority';

                if(process.env.MONGODB_CONNECTION_STRING){
                        db_connection_string = process.env.MONGODB_CONNECTION_STRING;
                }

                return db_connection_string;
        } 


        static get UDP_RECEIVER_PORT():number {
                this.Config();
                let recieverServerPort:number = 8089;
                if(process.env.RECEIVER_SERVER_PORT){
                        recieverServerPort = parseInt(process.env.RECEIVER_SERVER_PORT);
                }
                return recieverServerPort;
        }

        static get UDP_RECEIVER_HOST():string {
                this.Config();
                let receiverServerHost:string = "127.0.0.1";
                if(process.env.RECEIVER_SERVER_HOST){
                        receiverServerHost = process.env.RECEIVER_SERVER_HOST;
                }
                return receiverServerHost;

        }

        static get APPLICATION_NAME():string {
                this.Config();
                let name:string = "Application A";
                if(process.env.APPLICATION_NAME){
                        name = process.env.APPLICATION_NAME;
                }

                return name;


        }

    
}