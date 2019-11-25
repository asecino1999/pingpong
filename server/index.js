var express = require('express')
ms = require('mediaserver');

app=express()

app.get('/music.mp3', function(req, res){
    ms.pipe(req, res, "./audioclip-1574392503-111.mp3");
  });

app.listen(8080,()=>{
    console.log("listening")
})
