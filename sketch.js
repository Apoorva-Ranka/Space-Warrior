var hero,invader,earth,Invader,hlaser1
var backGround,MeteorImage,InvaderImage,heroImage,earthImage
var count = 0
var posarray = []
var invadergrp,Hlasergrp
var rand2 = 300


function preload(){
  earthImage = loadImage("images/Earth.png")
  heroImage = loadImage("images/SuperHero.png")
  backGround = loadImage("images/Space.jpg")
  MeteorImage = loadImage("images/Meteor.png")
  InvaderImage = loadImage("images/Invaders.png")
}

function setup() {

  createCanvas(1200,650);

  hero = createSprite(600,400)
  hero.addImage(heroImage)
  hero.scale = 0.12

  earth = createSprite(600,575)
  earth.addImage(earthImage)
  earth.scale = 0.15

  invadergrp = createGroup()
  Hlasergrp = createGroup()

}

function draw() {
  background(backGround);
  
  

  hero.velocityX = 0
  hero.velocityY = 0

  if(keyDown(RIGHT_ARROW)){
    hero.velocityX = 5
  }

  if(keyDown(LEFT_ARROW)){
    hero.velocityX = -5
  }

  if(keyWentDown('SPACE')){
    Hlaser()
  } 

  /*if(Hlasergrp.isTouching(invadergrp)){
    invadergrp.destroyEach()
    Hlasergrp.destroyEach()
    count = count-1
    console.log(count)
  }*/

    for (var i = 0; i < invadergrp.length; i++) {
      if (invadergrp[i].isTouching(Hlasergrp)) {

        invadergrp[i].destroy();
        count=count-1
        posarray.splice(invadergrp[i],1)

        console.log(posarray)
       } 
     }
     
  Meteors()
  Invaders()
  
  drawSprites();
}

function Meteors(){
  
  if(frameCount%100 === 0){
    var rand = Math.round(random(300,900))
    var Meteor = createSprite(rand,-50)
    Meteor.addImage(MeteorImage)
    Meteor.velocityY = 3
    Meteor.scale = 0.05
    Meteor.lifetime = 250
  }
}

function Invaders(){

  //var rand = Math.round(random(300,900))
  if(frameCount%40 === 0){
    
    if(count<=4){
     
      Invader = createSprite(rand2,20)
      rand2 = rand2+50
      Invader.addImage(InvaderImage)
      Invader.scale = 0.05
      invadergrp.add(Invader)

      posarray.push(Invader.position.x)
      console.log(posarray)

      count = count+1

      var laser1 = createSprite(Invader.x-5,40,5,12)
      laser1.shapeColor = "red"
      laser1.velocityY = 2
      laser1.lifetime = 325

      var laser2 = createSprite(Invader.x+5,40,5,12)
      laser2.shapeColor = "red"
      laser2.velocityY = 2
      laser2.lifetime = 325 
    }
  }

  if(frameCount%100 === 0 && count===5){

    var rand1 = Math.round(random(0,4))

    var laser1 = createSprite(posarray[rand1]-5,40,5,12)
    laser1.shapeColor = "red"
    laser1.velocityY = 2

    var laser2 = createSprite(posarray[rand1]+5,40,5,12)
    laser2.shapeColor = "red"
    laser2.velocityY = 2
  }
}

function Hlaser(){
  hlaser = createSprite(hero.x+10,hero.y-80,5,12)
  hlaser.shapeColor = "red"
  hlaser.velocityY = -7
  hlaser.lifetime = 175

  Hlasergrp.add(hlaser)
}