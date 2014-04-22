function transcribe(words) {
  document.getElementById("description").value = words;
  document.getElementById("mic").value = "";
  document.getElementById("description").focus();
}


takePhoto = function(){
  $("#photo").click();
}
takeVideo = function(){
 $("#video").click(); 
}

$(function(){
  $("#photo").change(function(){
    //var ctx = document.getElementById('display_image').getContext('2d')
    var ctx = document.getElementById('display_image')
    var img = new Image()
    var path   = document.getElementById("photo").files[0]
    var url = window.URL || window.webkitURL
    var src = url.createObjectURL(path);

    img.src = src;
    img.onload = function(){
      x = 150;
      y = (img.height * (x/img.width)) - (x/img.width);
      $(ctx).attr("src",src);
      $(ctx).attr("width",x);
      $(ctx).attr("height",y);
      url.revokeObjectURL(src);
    }
  });

  $("#video").change(function(){
    var ctx = document.getElementById('display_video')

    //var video = new Video();
    var path   = document.getElementById("video").files[0]
    var url = window.URL || window.webkitURL
    var src = url.createObjectURL(path);
    $(ctx).attr("src",src);
    $(ctx).attr("width",300);
    $(ctx)[0].play();
  });

});



$(function(){


    hostServer = 'http://174.129.225.176:80'
    connected = false;

    var socket = null;
    try{
        socket = io.connect(hostServer);
        connected = true;

        socket.on("respuesta_sendMessage",function(data){
          alert(data.status);
          $("#images").append("<img src='" + data.base64Image + "' style='width:100px; height:100px' />")
        })
    } catch(err){
        connected = false;
        //setTimeout(function(){window.location.reload()},3000)
    }

        $('#envia_tip').click(function(e){
          var photo = $('#photo')[0].files[0],
          reader = new FileReader();
          reader.onload = function(evt){

            data = {
              base64Image: evt.target.result,
              description:$("#description").val(),
            }

            $("#description").val("");
            $("#photo").val("");

            /*$("#sendFormFoto").hide();
            setTimeout(function(){
              $("#sendFormFoto").show();
            }, 2000);*/

            socket.emit('sendMessage', data);
          };
          reader.readAsDataURL(photo);  
          return false;
        });

      });