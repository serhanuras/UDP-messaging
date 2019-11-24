# udp-messaging
UDP messaging application


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
        "docker run -e "APPTYPE=FIRSTAPP" -p 3001:3001 -p 3001:3001/udp -i -t messaging-firstapp"
    - İkinci docker container i çalıştırmak için 
        "docker run -e "APP_TYPE=SECONDAPP" -p 3002:3002 -p 3002:3002/udp -i -t messaging-secondapp"


4. Image lar ayağa kaltıktan sonra karşılıklı mesajlaşma yapmak için swagger UI ini kullanabilirsiniz.

   - Birinci makinanın swagger UI na "http://localhost:3001/api-docs" ile erişebilirsiniz.
   - İkinci makinanın swagger UI na "http://localhost:3002/api-docs" ile erişebilirsiniz.

Test için Swagger UI dan mesage gönderip, ilgili clustur a gelen mesajları ve gönderdiği mesajları görebilirsiniz. 
WebAPI tarafındaki send message methodu UDP üzerinden diğer makina mesajı iletmektedir, mesajı UDP üzerinde alan makina mesajı 
mongoDB ye kaydedip, acknowledge mesajı UDP ile geriye iletmektedir, UDP üzerinden acknowledge mesajını alan makina 
ilgili mesajın type'ni "0" dan "1" update eder, yani message.type=1 karşılık haberleşme olduğunu göstermektedir.
