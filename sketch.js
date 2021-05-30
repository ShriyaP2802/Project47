var player,gameState;
var sun1,sun2,co,fertilizer,water;
var human;
var sunImage,coImage,ferImage,waterImage, humanImage;
var seed,sapling,sTree,bTree, bgImage;
var buttonImage, titleImage;
var gameState;
var start = 0;
var round1 =1;
var edges;
var sunCount = 0;
var END = 2


function preload(){
sunImage = loadImage("sunImage.png");
coImage = loadImage("co2Image.png");
ferImage = loadImage("fertilizerImage.png");
waterImage = loadImage("waterImage.png");
seed = loadImage("seedImage.png");
sapling = loadImage("saplingImage.png");
sTree = loadImage("smallTreeImage.png");
bTree = loadImage("bigTreeImage.png");
bgImage = loadImage("backgroundImage.png");
humanImage = loadImage("humanImage.png");
buttonImage = loadImage("PlayButtonImage.png");
titleImage = loadImage("titleImage.png");
}

function setup() {
  createCanvas(windowWidth-50,windowHeight-50);
  edges = createEdgeSprites();
  gameState = start;

  button = createSprite(width/2, 400, 80, 50);
  button.addImage("buttonImage",buttonImage);
  button.scale = 0.2;

 title = createSprite(width/2,200,50,50);
 title.addImage("titleImage",titleImage);

 player = createSprite(600,height-80,30,10);
    player.addImage("seedImage",seed);
    player.scale = 0.1;
    player.visible = false;
    sun1 = createSprite(width,random(100,height-200));
    sun1.addImage("sun1Image",sunImage);
    sun1.scale = 0.5;
    sun1.velocityX = -(random(4,8));
    sun1.velocityY = -(random(4,8));
    sun1.visible = false;
  
    sun2 = createSprite(0,random(200,height-300));
    sun2.addImage("sun2Image",sunImage);
    sun2.scale = 0.5;
    sun2.velocityX = (random(4,8));
    sun2.velocityY = (random(4,8));
    sun2.visible = false;

    humanGroup = new Group();
}

function draw() {
  background(bgImage);
  
  player.bounce(edges);

  if(mousePressedOver(button)){
    button.visible = false;
    title.visible = false;
    gameState = round1;
  }
  if(gameState === round1){

    player.visible = true;
    
    text("Catch Sun",windowWidth/10,windowHeight/10);
    text("Sun Count: "+sunCount,windowWidth/10,windowHeight/10+20);

    
    sun1.bounceOff(edges);
    sun1.bounce(sun2);
    sun2.bounceOff(edges);

    if(keyDown(UP_ARROW)){
      player.y = player.y-10;
    }
    if(keyDown(DOWN_ARROW)){
      player.y = player.y+10;
    }
    if(keyDown(RIGHT_ARROW)){
      player.x = player.x+10;
    }
    if(keyDown(LEFT_ARROW)){
      player.x = player.x-10;
    }

    enemies();
    humanGroup.bounceOff(edges[2]);
    humanGroup.bounceOff(edges[3]);
    humanGroup.bounceOff(edges[1]);

    sun1.visible = true;
    sun2.visible = true;

    if(sun1.isTouching(player)){
      sun1.destroy();
      sunCount = sunCount+1;
    }
    if(sun2.isTouching(player)){
      sun2.destroy();
      sunCount = sunCount+1;
    }
    if(sunCount===2){
      gameState = END;
    }

    if(humanGroup.isTouching(player)){

    }
  }
  if(gameState===END){

  }
  

  drawSprites();
}
function enemies(){
  if(frameCount%30===0){
    human = createSprite(width,random(50,height-100));
    human.addImage("human",humanImage);
    human.scale = 0.2;
    human.velocityX = -(random(4,8));
    human.velocityY = (random(4,8));
    humanGroup.add(human);
  }
humanGroup.lifetime = 1000;
}