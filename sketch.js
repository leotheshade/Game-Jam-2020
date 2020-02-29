var canvas;
var characterSprite;
var smokeNinjaSprite;
var smokeSamuraiSprite;
var smokeBoxerSprite;
 document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13 && document.fullscreenElement === null) {
      document.getElementById("mainScreen").requestFullscreen();
         resizeCanvas(windowWidth, windowHeight);
    }
  }, false);

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    characterSprite = createSprite(300,500,500,500)
    smokeNinjaSprite = createSprite(700,500,500,500)//need to position later
    smokeNinjaSprite.visible = false;
    smokeSamuraiSprite = createSprite(700,500,500,500);
    smokeSamuraiSprite.visible = false;
    smokeBoxerSprite = createSprite(700,500,500,500)
}

function draw() {
    background("black")
  // put drawing code here
    drawSprites();
}

function gameFlow(){
    this.stage = "intro";
}

function battle(){
    this.playerTurn = true;
    this.phase = "planning";
}


function mainCharacterData(){
    this.mode = "neutral";
    this.currentCreature = "none";
    
    
    
}
function smokeCreature(tag,defence,attack){
    this.tag = tag;
    this.health = 100;
    this.defence = defence;
    this.attack = attack;
    
}