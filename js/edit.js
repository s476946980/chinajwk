 function previewImage(file){
    var MAXWIDTH  = 90; 
    var MAXHEIGHT = 90;
    var div = document.getElementById('preview');
    div.innerHTML ='<img id=imghead onclick=$("#previewImg").click()>';
          var img = document.getElementById('imghead');
          img.onload = function(){
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width  =  rect.width;
            img.height =  rect.height;
            img.style.marginTop = rect.top+'px';
          }
          var reader = new FileReader();
          reader.onload = function(evt){img.src = evt.target.result;}
          reader.readAsDataURL(file.files[0]);
}