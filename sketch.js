var tower, towerimg;
var doorimg, door, doorGroup;
var climberimg, climber, climberGroup;
var ghost, ghostimg;
var invisible, invisibleGroup;

var gameState = "play";




function preload(){
  towerimg = loadImage ("tower.png");
  doorimg = loadImage ("door.png");
  climberimg = loadImage ("climber.png");
  ghostimg = loadImage ("ghost-standing.png");
  
}

function setup(){
  createCanvas (600, 600);
  
  tower = createSprite(300, 300);
  tower.addImage(towerimg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostimg);
  ghost.scale = 0.3;
  
  doorGroup = new Group ();
  climberGroup = new Group ();
  invisibleGroup = new Group ();
  
}

function draw(){
  background ("black");
  
  if(gameState === "play"){
  
  if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
    
  }
  
   if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
    
  }
  
   if(keyDown("space")){
    ghost.velocityY = -5;
    
  }
  
  //giving gravity to the ghost
  ghost.velocityY = ghost.velocityY +0.8;
  
  if(invisibleGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end";
  }
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  
  spawnDoors();
  drawSprites();
}

  if(gameState === "end"){
    
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over!!!", 230, 250);
    
  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200, -50);
    door.addImage (doorimg);
    
    climber = createSprite(200, 10);
    climber.addImage (climberimg);
    
    invisible = createSprite(200, 15);
    invisible.width = climber.width;
    invisible.height = 2;
    
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    door.lifetime = 600;
    
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 600;
    
    invisible.x = door.x;
    invisible.velocityY = 1;
    invisible.visible = false;
    
    ghost.depth = door.depth ;
    ghost.depth = ghost.depth + 1;
    
    doorGroup.add (door);
    climberGroup.add (climber);
    invisibleGroup.add (invisible);
    
    
  }
}