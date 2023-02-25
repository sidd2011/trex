var trex, trex_running, edges;
var groundImage;
var invisibleground;
var cloud;
var cloudImage;
var ob1,ob2,ob3,ob4,ob5,ob6;
var cactus;
var obGroup;
var cloudGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var TC;
var reset;
var GO;
var jump;
var die;
var check;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  TC = loadAnimation("trex_collided.png");
  reset = loadImage("restart.png");
  GO = loadImage("gameOver.png");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  check = loadSound("checkpoint.mp3");
}

function setup(){
  createCanvas(800,300);
  
  // creating trex

  trex = createSprite(50,140,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  trex.scale = 0.6;
  trex.x = 50
  ground = createSprite(200,280,1800,20);
  ground.addImage("BTS",groundImage);

invisibleground = createSprite(200,290,1800,10);
invisibleground.visible = false;

obGroup = new Group();
cloudGroup = new Group();
//trex.debug = true;
trex.setCollider("circle",0,0,20);
GAMEOVER = createSprite(400,100);
GAMEOVER.addImage(GO);
RESET = createSprite(400,180);
RESET.addImage(reset);
}

function draw(){
  //set background color 
  background("#f1c1f3");
  
  //logging the y position of the trex
  console.log(trex.y);
  
if(gameState === PLAY) {
  ground.velocityX = -8;
  if(ground.x<0) {
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")&& trex.y>= 230){
    trex.velocityY = -10;
    jump.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8;
  spawnClouds();
  spawnBTS();
  if(obGroup.isTouching(trex)){
    gameState = END;
  }
  GAMEOVER.visible = false;
  RESET.visible = false;
}
else if(gameState === END) {
  ground.velocityX = 0;
  trex.velocityY = 0;
  trex.changeAnimation("collided",TC);
  cloudGroup.setLifetimeEach(-1);
  obGroup.setLifetimeEach(-1);
  cloudGroup.setVelocityXEach(0);
  obGroup.setVelocityXEach(0);
  GAMEOVER.visible = true;
  RESET.visible = true;
}

  //jump when space key is pressed
  
  //stop trex from falling down
  
  trex.collide(invisibleground);
  
  drawSprites();
  

}

function spawnClouds(){
  
if(frameCount%110===0) {
  cloud = createSprite(800,100,30,10)
  cloud.velocityX = -5;
  cloud.y = Math.round(random(20,200));
  cloud.addImage("Blackpink",cloudImage);
  cloud.scale = 0.18;
  cloud.depth = trex.depth;
  trex.depth += 1;
  cloud.lifetime = 200 ;
  cloudGroup.add(cloud)
}
}

function spawnBTS(){
  if(frameCount%100===0) {
    cactus = createSprite(800,265,30,10)
    cactus.velocityX = -5;
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1:cactus.addImage(ob1);
      break;
      case 2:cactus.addImage(ob2);
      break;
      case 3:cactus.addImage(ob3);
      break;
      case 4:cactus.addImage(ob4);
      break;
      case 5:cactus.addImage(ob5);
      break;
      case 6:cactus.addImage(ob6);
      break;
    }
    
    cactus.scale = 0.5;
    cactus.lifetime = 160;
    obGroup.add(cactus);
}
}