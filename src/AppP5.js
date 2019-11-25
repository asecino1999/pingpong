
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
    this.x = 20;
    this.y = 20;
    this.dx = 1;
    this.dy = 1;
    this.audio = null
    var me = this
    this.advised2 = {
      me: me,
      colitionY: function () {
        //alert("working")
        me.dy = -1* me.dy  ;
      },
      colitionX: function () {
        //alert("working")
        me.dx = -1 * me.dx;
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
    after(this.advised2, "colitionX").add(this.adviser2, "override")
  }

  setup = (p5, canvasParentRef) => {
    alert("neceario para rep sonido")
    //this.song = p5.loadSound('./../public/audioclip-1574392503-111.mp3');
    this.audio = new Audio('http://localhost:8080/music.mp3');

    p5.createCanvas(400, 400);
  }
  draw = p5 => {

    p5.background(150);
    p5.noFill();
    p5.stroke(255);// color de linea 
    p5.strokeWeight(10);// grueso de linea 



    //p5.line(p5.mouseX - 30, p5.height - 50, p5.mouseX + 30, p5.height - 50);
    p5.rect(p5.mouseX - 30, p5.height - 35, 60, 30);
    //var tabla = new Rectangulo(p5.mouseX - 30, p5.height - 35, 60, 30);
    p5.strokeWeight(1);

    //p5.frameRate(5);


    p5.ellipse(this.x, this.y, 40, 40);
    //var bola = new Rectangulo(this.x, this.y, 40, 40)
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    if (this.x < 20 || this.x > p5.width - 20) {
      //this.dx = -this.dx;
      this.advised2.colitionX()
    }
    //new Rectangulo(p5.mouseX - 30, p5.height - 35, 60, 30)




    if (this.y < 20 || (this.x > p5.mouseX - 30 & this.x < p5.mouseX + 30 & this.y >= p5.height - 70)) {
      //alert("colition table ")
      //this.dy = -this.dy;
      this.advised2.colitionY()
      console.log(" pared")
    }
    if ((this.x <= p5.mouseX - 30 &
        this.y <= p5.height - 50 &
        p5.dist(this.x, this.y, p5.mouseX - 30, p5.height - 50) <= 20) ||
        (this.x >= p5.mouseX + 30 &
          this.y <= p5.height - 50 &
          p5.dist(this.x, this.y, p5.mouseX + 30, p5.height - 50) <= 20)
    ) {
      console.log(" barra")
      this.advised2.colitionX()
      this.advised2.colitionY()
      //alert("colition no table ")
    }
    console.log("y",this.y,this.dy)
    if (this.y > p5.height + 60) {

      //alert("you losse "+ this.y+ " "+(p5.height + 25))
      this.dy = 0;
      this.dx = 0;
    }
  }
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
  }

  render() {

    return (<div>




      <iframe width="300" height="200"
        src="mediaplayer2.html"
        allow="autoplay 'src' http://localhost:8080/music.mp3">
        <Sketch setup={this.setup} draw={this.draw} keyPressed={this.keyPressed} />
      </iframe>



    </div>)
  }
}


