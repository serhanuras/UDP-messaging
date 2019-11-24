# udp-messaging
UDP messaging application

ENGLISH:

**# Required steps for start up the application **

1. After downloding the application, you should change the RECEIVER_SERVER_HOST envoirement variable inside src/.env.first.app and src/.env.second.app files; 

  - If two docker image is going to work at your local machine, you should change this variable with your local ip.
  - If you planing to setup application in two seperated machine, each variables in .env file should refer to other machine ip. 
  
  WARNING : DON'T write localhost or 127.0.0.1, in that case application will not work, it will make udp inside the docker image. 


2. After replacing the RECEIVER_SERVER HOST varible, you should build docker image with using commands below.

   - To build first app docker image, execute command below; 
      "docker build -t messaging-firstapp ."
   - To build second app docker image, execute command below; 
      "docker build -t messaging-secondapp ."


3. After building docker images, you should start up the containers with using commmands below.

    - To start up first docker container, execute command below; 
        "docker run -e "APP_TYPE=FIRSTAPP" -p 3001:3001 -p 3001:3001/udp -i -t messaging-firstapp"
    - To start up second docker container, execute command below; 
        "docker run -e "APP_TYPE=SECONDAPP" -p 3002:3002 -p 3002:3002/udp -i -t messaging-secondapp"


4.After containers start up, you can use the Swagger UI for making UDP communication between machines.

   - To access first machine's Swagger UI, click "http://localhost:3001/api-docs" .
   - To acces second machine's Swagger UI, click "http://localhost:3002/api-docs" .


You can test the application with using POST method interface at SwaggerUI. This method send message to other machine with UDP protocol.
You can see the received and sent messsages with using GET method interface at SwaggerUI. You can delete all or sent or received
message with using DELETE method interface at SwaggerUI. 

UDP message is sent to other machine with "type" flag as "0", when the receiving server receives the message, it firstly saves the message to MongoDB with flag as "0" and then sends an UDP acknowledege message to sender server. When sender server recieves the acknowledege message, it updates the flag of the message to "1". So if you see the message with the flag of "1" that means communication between servers is succesfully completed.


TÜRKÇE:

**# Uygulamanın Çalışması için izlenmesi gereken adımlar **

1. Uygulama indirildikten sonra src/.env.first.app ve src/.env.second.app dosyalarındaki RECEIVER_SERVER_HOST değerini;

  - Her iki docker image ini kendi makinanızda çalıştıracaksanız, kendi makinanızı ip si yazınız.
  - İki farklı makinaya kuracaksanız, uygulamanın iletişim kuracağı makinanın ip sini yazınız. 
  
  UYARI: localhost veya 127.0.0.1 yazarsanız çalışmaz çünkü docker kendi içinde udp yapar.


2. Env un dosyalarını değiştirdikten sonra docker image larını altaki iki komudu çalıştırarak oluşturunuz.

   - Birinci docker image ini oluşturmak için; 
      "docker build -t messaging-firstapp ."
   - İkinci docker image ini oluşturmak için; 
      "docker build -t messaging-secondapp ." komutlarını çalıştırınız.


3.Docker image larını oluşturduktan sonra container ları çalıştırmak için altaki iki komudu çalıştırınız.

    - Birinci docker container i çalıştırmak için 
        "docker run -e "APP_TYPE=FIRSTAPP" -p 3001:3001 -p 3001:3001/udp -i -t messaging-firstapp"
    - İkinci docker container i çalıştırmak için 
        "docker run -e "APP_TYPE=SECONDAPP" -p 3002:3002 -p 3002:3002/udp -i -t messaging-secondapp"


4. Image lar ayağa kaltıktan sonra karşılıklı mesajlaşma yapmak için swagger UI ini kullanabilirsiniz.

   - Birinci makinanın swagger UI na "http://localhost:3001/api-docs" ile erişebilirsiniz.
   - İkinci makinanın swagger UI na "http://localhost:3002/api-docs" ile erişebilirsiniz.

Test için Swagger UI dan mesage gönderip, ilgili cluster a gelen mesajları ve gönderdiği mesajları görebilirsiniz. 
WebAPI tarafındaki send message methodu UDP üzerinden diğer makinaya mesajı iletmektedir, mesajı UDP üzerinde alan makina mesajı 
mongoDB ye kaydedip, acknowledge mesajını UDP ile geriye iletmektedir, UDP üzerinden acknowledge mesajını alan makina 
ilgili mesajın type'ni "0" dan "1" update eder, yani message.type=1 karşılık haberleşme olduğunu göstermektedir.
