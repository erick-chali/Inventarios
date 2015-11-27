<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>

  <head>
    <meta charset='utf-8' />
    <meta http-equiv="X-UA-Compatible" content="chrome=1" />
    <meta name="description" content="HTML5 QR code Reader : A cross platform HTML5 QR code reader." />

    
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/jsqrcode-combined.js"></script>
    <script src="js/script.js"></script>

    <title>HTML5 QR code Reader</title>
  </head>

  <body>
  <div class="jumbotron">
   </div>
   <div class="row">
        <div class="col-md-12">
           <h2>QR Code</h2>
           <div id="reader" style="width:300px;height:250px">
           </div>
           <h6>Result</h6>
           <span id="read" class="center"></span>
           <br>
       </div>
   </div>
   <div>
            <video id="live" width="320" height="240" autoplay></video>
        </div>
        <script>
        //Guardar el objeto video en una variable
        video = document.getElementById("live");
 
        //Acceder al dispositivo de camara web para mostrar el video
        navigator.webkitGetUserMedia("video",
                function(stream) {
                    video.src = webkitURL.createObjectURL(stream);//Obtenemos el video fuente de nuestra eitqueta video para mostrarlo
                },
                function(err) {
                    console.log("Unable to get video stream!");//obtenemos algun error posible al realizar esto
                }
        );
        </script>
  </body>
</html>