var express = require('express')
ms = require('mediaserver');

app=express()

app.get('/music.mp3', function(req, res){
    ms.pipe(req, res, './BeepBox-Song_4.mp3');
  });

app.get('/die.mp3', function(req, res){
    ms.pipe(req, res, './8d82b5_Pacman_Dies_Sound_Effect.mp3');
  });

app.listen(8080,()=>{
    console.log("listening")
})
