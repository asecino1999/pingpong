
import React from 'react';
import Sketch from 'react-p5'


//import ReactAudioPlayer from 'react-audio-player';

import Rectangulo from './figuras'

const before = require('aspectjs').before;
//let addAdvice = require("aspectjs").addAdvice;
const around = require('aspectjs').around;
const after = require('aspectjs').after;
//const loadSound2=require('./p5.sound').loadSound;
let advised, adviser//, result;
advised = {
  add: function (increment) {
    //console.log("incremeta en 2 ")   
    this.left += increment;
  },
  id: 'test',
  left: 32,
  top: 43
};
adviser = {
  override: function (increment) {
    //alert("iguala el encremto ") 
    advised.left = increment;
  }
};

before(advised, "add").add(adviser, "override");



export default class AppP5 extends React.Component {

  constructor() {
    super()
    this.x = 350/2;
    this.y = 480/2;
    this.r = 20;
    this.dx = 3;
    this.dy = 3;
    this.audio = null
    var me = this
    this.advised2 = {
      me: me,
      colitionY: function () {
        //alert("working")
        me.dy =- me.dy;
      },
      colitionX1: function () {
        //alert("working")
        //me.dx = -1 * me.dx;
        me.dx = -me.dx + 0.5; 
      },
      colitionX2: function () {
        //alert("working")
        //me.dx = -1 * me.dx;
        me.dx = -me.dx - 0.5; 
      }
    }
    this.adviser2 = {

      override: function () {
        //alert("colition y  ") 
        if (me.audio)
          me.audio.play();
      }
    };
    after(this.advised2, "colitionY").add(this.adviser2, "override")
    after(this.advised2, "colitionX1").add(this.adviser2, "override")
    after(this.advised2, "colitionX2").add(this.adviser2, "override")
  }

  setup = (p5, canvasParentRef) => {
    //alert("necesario para reproducior el sonido")
    //this.song = p5.loadSound('./../public/audioclip-1574392503-111.mp3');
    this.audio = new Audio('http://localhost:8080/music.mp3');

    p5.createCanvas(370, 450);
    p5.background(0);

    p5.paddle2 =10;
    p5.paddle1=10;

    p5.paddle1X = 10;
    p5.paddle1Height = 60;
    p5.paddle2Y = 330;
    p5.paddle2Height = 60;

    p5.score1 = 0;
    p5.score2 =0;
    p5.paddle1Y=0;

    p5.playerscore =0;
    p5.pcscore =0;
  }
  draw = p5 => {

    p5.background(0);
    
    //paddleInCanvas
    if(p5.mouseY+p5.paddle1Height > p5.height){
      p5.mouseY=p5.height-p5.paddle1Height;
    }
    if(p5.mouseY < 0){
      p5.mouseY =0;
    }

    //graph
    for(var i=0;i<p5.height;i+=20){
      p5.noFill();
      p5.stroke(255,0,0);// color de linea 
      p5.strokeWeight(0.5);// grueso de linea
      p5.rect(i,0,20,p5.height);
      p5.rect(0,i,p5.width,20);
    }

    //left paddle
    p5.fill(250,0,0);
    p5.stroke(0,0,250);
    p5.strokeWeight(0.5);
    p5.paddle1Y = p5.mouseY;
    p5.rect(p5.paddle1X,p5.paddle1Y,p5.paddle1,p5.paddle1Height,100);

    //pc computer paddle
    p5.fill(50,0,350);
    p5.stroke(250,0,0);
    var paddle2y = this.y - p5.paddle2Height/2;
    p5.rect(p5.paddle2Y,paddle2y,p5.paddle2,p5.paddle2Height,100);


    //midline
    for(var i=0;i<480;i+=10) {
      var y = 0;
      p5.fill(250,0,250);
      p5.stroke(0);
      p5.strokeWeight(3)
      p5.rect(p5.width/2,y+i,10,480);
    }

  //function drawScore show scores
    //drawScore

    //p5.textAlign(CENTER);
    p5.textSize(20);
    p5.fill(100,0,250);
    p5.stroke(250,0,0)
    p5.text("Player:",100,50)
    p5.text(p5.playerscore,140,50);
    p5.text("Computer:",255,50)
    p5.text(p5.pcscore,310,50)


    //models
    p5.textSize(15);
    p5.fill(255);
    p5.noStroke();
    p5.text("Width:"+p5.width,135,15);
    p5.text("Speed:"+Math.abs(this.dx),50,15);
    p5.text("Height:"+p5.height,235,15)


    //move
    p5.fill(50,350,0);
    p5.stroke(255,0,0);
    p5.strokeWeight(0.5);
    p5.ellipse(this.x,this.y,this.r,20)
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    //colission X2
    if(this.x + this.r > p5.width - this.r/2){
      //this.dx=-this.dx-0.5;       
      this.advised2.colitionX2();
      console.log("X2");
    }

    //colission X1
    if (this.x-2.5*this.r/2< 0){
        if (this.y >= p5.paddle1Y && this.y <= p5.paddle1Y + p5.paddle1Height) {
          //this.dx = -this.dx + 0.5; 
          this.advised2.colitionX1();
          console.log("X1");
      }
      else{
        p5.pcscore++;
    //    reset();
        this.x = p5.width/2+100;
        this.y = p5.height/2+100;
        this.dx=3;
        this.dy=3;
        
        navigator.vibrate(100);
      }
    }
    if(p5.pcscore == 4){
      p5.fill(0,250,0);
      p5.stroke(0)
      p5.rect(0,0,p5.width,p5.height-1);
      p5.fill(250,0,250);
      p5.stroke(250,0,0);
      p5.textSize(20)
      p5.text("Game Over!☹☹",p5.width/2,p5.height/2);
      p5.text("Reiniciar!",p5.width/2,p5.height/2+30)
      p5.noLoop();
      p5.pcscore = 0;
    }
    if(this.y + this.r > p5.height || this.y-this.r <0){
      this.advised2.colitionY();
      console.log("y1");
    }

  }

/*  
  //function reset when ball does notcame in the contact of padde
  reset = p5 => {

    this.x = p5.width/2+100;
    this.y = p5.height/2+100;
    this.dx=3;
    this.dy=3;
  }


  //function midline draw a line in center
  midline = p5 => {

    for(i=0;i<480;i+=10) {
      var y = 0;
      p5.fill(250,0,250);
      p5.stroke(0);
      p5.strokeWeight(3)
      p5.rect(p5.width/2,y+i,10,480);
      }
  }

  //function drawScore show scores
  drawScore = p5 => {

    p5.texttextAlign(CENTER);
    p5.textSize(20);
    p5.fill(100,0,250);
    p5.stroke(250,0,0)
    p5.text("Player:",100,50)
    p5.text(p5.playerscore,140,50);
    p5.text("Computer:",255,50)
    p5.text(p5.pcscore,310,50)
  }

  //very important function of this game
  move = p5 => {

    p5.fill(50,350,0);
    p5.stroke(255,0,0);
    p5.strokeWeight(0.5);
    p5.ellipse(this.x,this.y,this.r,20)
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    if(this.x + this.r > p5.width - this.r/2){
      this.dx=-this.dx-0.5;       
    }
    if (this.x-2.5*this.r/2< 0){
        if (this.y >= p5.paddle1Y && this.y <= p5.paddle1Y + p5.paddle1Height) {
          this.dx = -this.dx + 0.5; 
      }
      else{
        p5.pcscore++;
    //    reset();
        this.x = p5.width/2+100,
        this.y = p5.height/2+100;
        this.dx=3;
        this.dy=3;

        navigator.vibrate(100);
      }
    }
    if(p5.pcscore == 4){
      p5.fill(0,250,0);
      p5.stroke(0)
      p5.rect(0,0,width,height-1);
      p5.fill(250,0,250);
      p5.stroke(250,0,0);
      p5.textSize(20)
      p5.text("Game Over!☹☹",width/2,height/2);
      p5.text("Reiniciar!",width/2,height/2+30)
      noLoop();
      p5.pcscore = 0;
    }
    if(this.y + this.r > p5.height || this.y-this.r <0){
      this.dy =- this.dy;
    }
  }

  models = p5 => {

    p5.textSize(15);
    p5.fill(255);
    p5.noStroke();
    p5.text("Width:"+p5.width,135,15);
    p5.text("Speed:"+abs(this.dx),50,15);
    p5.text("Height:"+p5.height,235,15)
  }

  paddleInCanvas = p5 => {

    if(p5.mouseY+p5.paddle1Height > p5.height){
      p5.mouseY=p5.height-p5.paddle1Height;
    }
    if(p5.mouseY < 0){
      p5.mouseY =0;
    }
  }
  */
  /*
  keyPressed = (p5) => {
    //console.log(p5)
    //console.log(p5.keyCode)
    //alert()
    if (p5.keyCode === 96) {
      console.log([this.x, p5.mouseX - 30, p5.mouseX + 30])
      console.log([this.y, p5.height - 35, p5.height - 15])
      var tabla = new Rectangulo(p5.mouseX - 30, p5.height - 35, 60, 30);
      var bola = new Rectangulo(this.x, this.y, 40, 40)
      tabla.Pcolition(bola)
      alert()

      return
    }
    advised.add(2);
    this.x = p5.random(20, p5.width - 20);
    this.y = 20;
    this.dx = 1;
    this.dy = 1;
  } */

  render() {

    return (<div>
      
      <iframe width="0" height="0"
        src="mediaplayer2.html"
        allow="autoplay 'src' http://localhost:8080/music.mp3">
        <Sketch setup={this.setup} draw={this.draw} reset={this.reset} midline={this.midline} 
        drawScore={this.drawScore} move={this.move} models={this.models} paddleInCanvas={this.paddleInCanvas}/>
      </iframe>
    </div>)
  }
}



