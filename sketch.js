var canvas;
var characterSprite;
var smokeNinjaSprite;
var smokeSamuraiSprite;
var smokeDoubleSprite;
var punchTargets = [];
var bossFight = new battle();
var character = new mainCharacterData();
var demonSprite;
var selectingCreature = false
var currentNum = 0;
var num = 0;
var targetInterval = 0;
var netDamage = 0;
var combo = 0;
var spearSmoke = new smokeCreature("spear",10, 20);
var swordSmoke = new smokeCreature("sword",10, 25);
var boss = new demon()
var ready = false;
var slashes = [];
var thetaI = 0;
var theta = 0;
var timeup = false;
var slashSize = 0;
var slashing = false;
var expanding = 1;
var slash = {x1:0,y1:0,x2:0,y2:0}
var animSlash = {x1:0,y1:0,x2:0,y2:0}
var demonBuffs = ["barrier","minion","haze","speed"];
var gameOver = false;
var idleRonin;
var stuff;
var song;
var songs = [];
var sword;
var pipe;
var spear;
var numHit = 0;
var selectedIndex = 0;
var gameStarted = false;
var titleScreen;
var demonAbilitySprite;
var mainGroup;
var abilityGroup;
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
 document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13 && document.fullscreenElement === null) {
      document.getElementById("mainScreen").requestFullscreen();
        console.log(selectedIndex)
        gameStarted = true;
        titleScreen.visible = false
         songs[selectedIndex].play();
    songs[selectedIndex].loop()
         
    }
  }, false);

function makeAnimationArrayFromRoot(root,frames){
    var tempArray = []
    for(var i = 0; i<frames;i++){
        var tempRoot = root;
        if(i < 10){
            tempRoot += "0"
        }
        tempArray.push(tempRoot + i)
    }
    return tempArray;
}
function preload(){
    selectedIndex = Math.floor(random(0,4))
    sword = loadImage('assets/icons/sword.png')
    pipe= loadImage('assets/icons/pipe.png')
    spear = loadImage('assets/icons/spear.png')

    abilityGroup = new Group()
    mainGroup = new Group()
    song = loadSound("assets/FailtheFuture.mp3")
    songs.push(loadSound("assets/BattleofBurns.mp3"))
    songs.push(loadSound("assets/Chosenfortrial.mp3"))
    songs.push(loadSound("assets/FieldsofFallen.mp3"))
    songs.push(loadSound("assets/PathofFew.mp3"))
    stuff = loadImage("assets/gbg/sprite_0.png")
//    idleRonin = loadAnimation('assets/IDLEronin/sprite_00.png','assets/IDLEronin/sprite_09.png')
    characterSprite = createSprite(300,500,500,500)
    characterSprite.addAnimation('idle','assets/IDLEronin/sprite_00.png','assets/IDLEronin/sprite_09.png')
     characterSprite.addAnimation('slash','assets/ACTIVE1ronin/sprite_00.png','assets/ACTIVE1ronin/sprite_01.png','assets/ACTIVE1ronin/sprite_02.png','assets/ACTIVE1ronin/sprite_03.png','assets/ACTIVE1ronin/sprite_04.png','assets/ACTIVE1ronin/sprite_05.png','assets/ACTIVE1ronin/sprite_06.png','assets/ACTIVE1ronin/sprite_07.png','assets/ACTIVE1ronin/sprite_08.png','assets/ACTIVE1ronin/sprite_09.png','assets/ACTIVE1ronin/sprite_10.png','assets/ACTIVE1ronin/sprite_11.png','assets/ACTIVE1ronin/sprite_12.png','assets/ACTIVE1ronin/sprite_13.png')
    characterSprite.addAnimation('stab', 'assets/ACTIVE2ronin/sprite_00.png','assets/ACTIVE2ronin/sprite_01.png','assets/ACTIVE2ronin/sprite_02.png','assets/ACTIVE2ronin/sprite_03.png','assets/ACTIVE2ronin/sprite_04.png','assets/ACTIVE2ronin/sprite_05.png','assets/ACTIVE2ronin/sprite_06.png','assets/ACTIVE2ronin/sprite_07.png','assets/ACTIVE2ronin/sprite_08.png','assets/ACTIVE2ronin/sprite_09.png','assets/ACTIVE2ronin/sprite_10.png','assets/ACTIVE2ronin/sprite_11.png','assets/ACTIVE2ronin/sprite_12.png','assets/ACTIVE2ronin/sprite_13.png')
    smokeDoubleSprite = createSprite(600,500,500,500)
    smokeDoubleSprite.addAnimation('idle','assets/IDLEroninclone/sprite_00.png','assets/IDLEroninclone/sprite_09.png')
    
    smokeDoubleSprite.addAnimation('slash','assets/ACTIVE1roninclone/sprite_000.png','assets/ACTIVE1roninclone/sprite_001.png','assets/ACTIVE1roninclone/sprite_002.png','assets/ACTIVE1roninclone/sprite_003.png','assets/ACTIVE1roninclone/sprite_004.png','assets/ACTIVE1roninclone/sprite_005.png','assets/ACTIVE1roninclone/sprite_006.png','assets/ACTIVE1roninclone/sprite_007.png','assets/ACTIVE1roninclone/sprite_008.png','assets/ACTIVE1roninclone/sprite_009.png','assets/ACTIVE1roninclone/sprite_010.png','assets/ACTIVE1roninclone/sprite_011.png','assets/ACTIVE1roninclone/sprite_012.png','assets/ACTIVE1roninclone/sprite_013.png')
    smokeDoubleSprite.addAnimation('stab', 'assets/ACTIVE2roninclone/sprite_00.png','assets/ACTIVE2roninclone/sprite_01.png','assets/ACTIVE2roninclone/sprite_02.png','assets/ACTIVE2roninclone/sprite_03.png','assets/ACTIVE2roninclone/sprite_04.png','assets/ACTIVE2roninclone/sprite_05.png','assets/ACTIVE2roninclone/sprite_06.png','assets/ACTIVE2roninclone/sprite_07.png','assets/ACTIVE2roninclone/sprite_08.png','assets/ACTIVE2roninclone/sprite_09.png','assets/ACTIVE2roninclone/sprite_10.png','assets/ACTIVE2roninclone/sprite_11.png','assets/ACTIVE2roninclone/sprite_12.png','assets/ACTIVE2roninclone/sprite_13.png')//adjust size
    characterSprite.scale = 0.8;
    smokeDoubleSprite.scale = 0.8
        demonSprite = createSprite(1200,450,500,500)
    demonSprite.scale = 1.5;
    demonSprite.addAnimation('idle','assets/IDLEdemonBoss/sprite_00.png','assets/IDLEdemonBoss/sprite_01.png','assets/IDLEdemonBoss/sprite_02.png','assets/IDLEdemonBoss/sprite_03.png','assets/IDLEdemonBoss/sprite_04.png','assets/IDLEdemonBoss/sprite_05.png','assets/IDLEdemonBoss/sprite_06.png','assets/IDLEdemonBoss/sprite_07.png','assets/IDLEdemonBoss/sprite_08.png','assets/IDLEdemonBoss/sprite_09.png','assets/IDLEdemonBoss/sprite_10.png','assets/IDLEdemonBoss/sprite_11.png','assets/IDLEdemonBoss/sprite_12.png','assets/IDLEdemonBoss/sprite_13.png','assets/IDLEdemonBoss/sprite_14.png','assets/IDLEdemonBoss/sprite_15.png','assets/IDLEdemonBoss/sprite_16.png')
    demonSprite.addAnimation('slash','assets/ACTIVE1demonbossclone/sprite_00.png','assets/ACTIVE1demonbossclone/sprite_01.png','assets/ACTIVE1demonbossclone/sprite_02.png','assets/ACTIVE1demonbossclone/sprite_03.png','assets/ACTIVE1demonbossclone/sprite_04.png','assets/ACTIVE1demonbossclone/sprite_05.png','assets/ACTIVE1demonbossclone/sprite_06.png','assets/ACTIVE1demonbossclone/sprite_07.png','assets/ACTIVE1demonbossclone/sprite_08.png','assets/ACTIVE1demonbossclone/sprite_09.png','assets/ACTIVE1demonbossclone/sprite_10.png','assets/ACTIVE1demonbossclone/sprite_11.png','assets/ACTIVE1demonbossclone/sprite_12.png','assets/ACTIVE1demonbossclone/sprite_13.png','assets/ACTIVE1demonbossclone/sprite_14.png','assets/ACTIVE1demonbossclone/sprite_15.png','assets/ACTIVE1demonbossclone/sprite_16.png','assets/ACTIVE1demonbossclone/sprite_17.png','assets/ACTIVE1demonbossclone/sprite_18.png','assets/ACTIVE1demonbossclone/sprite_19.png','assets/ACTIVE1demonbossclone/sprite_20.png','assets/ACTIVE1demonbossclone/sprite_21.png','assets/ACTIVE1demonbossclone/sprite_22.png','assets/ACTIVE1demonbossclone/sprite_23.png','assets/ACTIVE1demonbossclone/sprite_24.png','assets/ACTIVE1demonbossclone/sprite_25.png','assets/ACTIVE1demonbossclone/sprite_26.png','assets/ACTIVE1demonbossclone/sprite_27.png','assets/ACTIVE1demonbossclone/sprite_28.png','assets/ACTIVE1demonbossclone/sprite_29.png');

    characterSprite.addAnimation('death', 'assets/RIPronin/sprite_00.png', 'assets/RIPronin/sprite_01.png', 'assets/RIPronin/sprite_02.png', 'assets/RIPronin/sprite_03.png', 'assets/RIPronin/sprite_04.png', 'assets/RIPronin/sprite_05.png', 'assets/RIPronin/sprite_06.png', 'assets/RIPronin/sprite_07.png', 'assets/RIPronin/sprite_08.png', 'assets/RIPronin/sprite_09.png', 'assets/RIPronin/sprite_10.png', 'assets/RIPronin/sprite_11.png', 'assets/RIPronin/sprite_12.png', 'assets/RIPronin/sprite_13.png', 'assets/RIPronin/sprite_14.png', 'assets/RIPronin/sprite_15.png', 'assets/RIPronin/sprite_16.png', 'assets/RIPronin/sprite_17.png', 'assets/RIPronin/sprite_18.png', 'assets/RIPronin/sprite_19.png', 'assets/RIPronin/sprite_20.png')

smokeDoubleSprite.addAnimation('death', 'assets/RIProninclone/sprite_00.png', 'assets/RIProninclone/sprite_01.png', 'assets/RIProninclone/sprite_02.png', 'assets/RIProninclone/sprite_03.png', 'assets/RIProninclone/sprite_04.png', 'assets/RIProninclone/sprite_05.png', 'assets/RIProninclone/sprite_06.png', 'assets/RIProninclone/sprite_07.png', 'assets/RIProninclone/sprite_08.png', 'assets/RIProninclone/sprite_09.png', 'assets/RIProninclone/sprite_10.png', 'assets/RIProninclone/sprite_11.png', 'assets/RIProninclone/sprite_12.png', 'assets/RIProninclone/sprite_13.png', 'assets/RIProninclone/sprite_14.png', 'assets/RIProninclone/sprite_15.png', 'assets/RIProninclone/sprite_16.png', 'assets/RIProninclone/sprite_17.png', 'assets/RIProninclone/sprite_18.png', 'assets/RIProninclone/sprite_19.png', 'assets/RIProninclone/sprite_20.png')
    demonSprite.addAnimation('death', 'assets/RIPdemonboss/sprite_00.png', 'assets/RIPdemonboss/sprite_01.png', 'assets/RIPdemonboss/sprite_02.png', 'assets/RIPdemonboss/sprite_03.png', 'assets/RIPdemonboss/sprite_04.png', 'assets/RIPdemonboss/sprite_05.png', 'assets/RIPdemonboss/sprite_06.png', 'assets/RIPdemonboss/sprite_07.png', 'assets/RIPdemonboss/sprite_08.png', 'assets/RIPdemonboss/sprite_09.png', 'assets/RIPdemonboss/sprite_10.png', 'assets/RIPdemonboss/sprite_11.png', 'assets/RIPdemonboss/sprite_12.png', 'assets/RIPdemonboss/sprite_13.png', 'assets/RIPdemonboss/sprite_14.png', 'assets/RIPdemonboss/sprite_15.png', 'assets/RIPdemonboss/sprite_16.png', 'assets/RIPdemonboss/sprite_17.png', 'assets/RIPdemonboss/sprite_18.png', 'assets/RIPdemonboss/sprite_19.png')
    
    
//    smokeDoubleSprite.animation.frameDelay = 2;
//    smokeDoubleSprite.changeAnimation('slash')

    demonAbilitySprite = createSprite(1200,450,500,500)
    demonAbilitySprite.scale = 1.5;
    demonAbilitySprite.addAnimation("minion",'assets/Army/sprite_00.png','assets/Army/sprite_09.png');
    demonAbilitySprite.addAnimation("armyIdle",'assets/ArmyIdle/sprite_00.png','assets/ArmyIdle/sprite_11.png');
    demonAbilitySprite.addAnimation("haze",'assets/HazySmoke/sprite_0.png','assets/HazySmoke/sprite_3.png');
    demonAbilitySprite.addAnimation("barrier",'assets/Shield/sprite_00.png','assets/Shield/sprite_09.png');
    demonAbilitySprite.addAnimation("barrierIdle",'assets/Shield/sprite_09.png');
    demonAbilitySprite.addAnimation("speed",'assets/Whirlwind/sprite_0.png','assets/Whirlwind/sprite_3.png');
    demonAbilitySprite.addAnimation("speedIdle",'assets/WhirlwindIdle/sprite_0.png','assets/WhirlwindIdle/sprite_2.png')
    demonAbilitySprite.visible = false;
    characterSprite.addToGroup(mainGroup);
    smokeDoubleSprite.addToGroup(mainGroup);
    demonSprite.addToGroup(mainGroup);
    demonAbilitySprite.addToGroup(abilityGroup);


}
function setup() {
    
    canvas = createCanvas(windowWidth, windowHeight);
    
    titleScreen = createSprite(width/2,height/2,width,height)
    titleScreen.addAnimation('stand','assets/intro/IMG_2270.JPG', 'assets/intro/IMG_2271.JPG', 'assets/intro/IMG_2272.JPG', 'assets/intro/IMG_2273.JPG', 'assets/intro/IMG_2274.JPG', 'assets/intro/IMG_2275.JPG','assets/intro/IMG_2276.JPG')
    titleScreen.scale = 0.5;
//    titleScreen.width = width;
//    titleScreen.height = height;
    titleScreen.animation.frameDelay = 12;
    titleScreen.addToGroup(mainGroup)
//    frameRate(60)
//    characterSprite = createSprite(300,500,500,500)
//    smokeNinjaSprite = createSprite(600,500,500,500)//need to position later
//    smokeNinjaSprite.visible = false;
//    smokeSamuraiSprite = createSprite(600,500,500,500);
//    smokeSamuraiSprite.visible = false;
//    smokeDoubleSprite = createSprite(600,500,500,500)
//    smokeBoxerSprite.visible = false; 
//    characterSprite.addAnimation('idle','assets/IDLEronin/sprite_00.png','assets/IDLEronin/sprite_09.png')
//    declareAnimations()
   
    
}

function draw() {
    resizeCanvas(windowWidth, windowHeight);
    background("black");
    if(gameStarted){
    if(bossFight.phase !== "dead"){
    push();
    if(bossFight.playerTurn && bossFight.phase == "planning"){
    translate((width/2 - mouseX)/30,0);
    }
        push()
//    scale(0.5)
    image(stuff,-30,0,width+60,height)
    pop()
    
    drawSprites(mainGroup);
        push()
        tint(255,75)
        drawSprites(abilityGroup)
        pop()
        if((smokeDoubleSprite.getAnimationLabel() == "slash" || smokeDoubleSprite.getAnimationLabel() == "stab") && smokeDoubleSprite.animation.getFrame() == smokeDoubleSprite.animation.getLastFrame()){
                        smokeDoubleSprite.animation.changeFrame(0)
            smokeDoubleSprite.scale = 0.8;

            smokeDoubleSprite.changeAnimation('idle')
            
        }
        if(demonSprite.getAnimationLabel() == "slash" && demonSprite.animation.getFrame() == demonSprite.animation.getLastFrame()){
            demonSprite.animation.changeFrame(0)
            demonSprite.changeAnimation('idle')
        }
if((characterSprite.getAnimationLabel() == "slash" || characterSprite.getAnimationLabel() == "stab") && characterSprite.animation.getFrame() == characterSprite.animation.getLastFrame()){
                        characterSprite.animation.changeFrame(0)
            characterSprite.scale = 0.8;

            characterSprite.changeAnimation('idle')
            
        }    pop();
        
        if(demonAbilitySprite.getAnimationLabel() == "minion" && demonAbilitySprite.animation.getFrame() == demonAbilitySprite.animation.getLastFrame()){
            demonAbilitySprite.animation.changeFrame(0);
            demonAbilitySprite.changeAnimation("armyIdle")
        }
        if(demonAbilitySprite.getAnimationLabel() == "barrier" && demonAbilitySprite.animation.getFrame() == demonAbilitySprite.animation.getLastFrame()){
            demonAbilitySprite.animation.changeFrame(0);
            demonAbilitySprite.changeAnimation("barrierIdle")
        }
        if(demonAbilitySprite.getAnimationLabel() == "speed" && demonAbilitySprite.animation.getFrame() == demonAbilitySprite.animation.getLastFrame()){
            demonAbilitySprite.animation.changeFrame(0);
            demonAbilitySprite.changeAnimation("speedIdle")
        }
    fill("red");
    if(bossFight.playerTurn && bossFight.phase == "planning"){
    ellipse(width/2 - 300,750,100,100)//pipe
        image(pipe,width/2-415,690,240,240)
    ellipse(width/2, 750, 100,100)//battle
        if(character.currentCreature == "boxer"){
            image(spear,width/2-120,630,250,250)
        }else if(character.currentCreature == "samurai"){
//            console.log("ss")
            image(sword,width/2-140,590,300,300)

        }
        if(selectingCreature){
            ellipse(width/2-425,625,100,100)//boxerSelection
                        image(spear,width/2-545,505,250,250)
//            ellipse(width/2 - 300, 625,100,100)//ninja selection
            ellipse(width/2 -175,625,100,100)//samurai selection
            image(sword,width/2-315,465,300,300)
        }
    }
    
    for(var i of punchTargets){
        if(i.active){
            if(bossFight.playerTurn){
        push();
        strokeWeight(4);
        ellipse(i.x,i.y,100,100);
        noFill();
        stroke("red")
            strokeWeight(2);
        ellipse(i.x,i.y,i.timeSize,i.timeSize);
            fill("black");
            textSize(60);
            text(i.num,i.x-15,i.y+20)
        i.timeSize -= 3.8 * i.speedBonus;
        if(i.timeSize < 70){
            i.active = false;
        }
        pop();
            }else if(bossFight.phase == "combat" && boss.phase == 2 && !bossFight.playerTurn){
                push();
        strokeWeight(4);
                fill("red")
                stroke("black")
        ellipse(i.x,i.y,100,100);
//        noFill();
//        stroke("red")
                fill("black")
            strokeWeight(2);
        ellipse(i.x,i.y,i.timeSize,i.timeSize);
            fill("red");
            textSize(60);
            text(i.num,i.x-15,i.y+20)
        i.timeSize += 1.5 * i.speedBonus;
        if(i.timeSize > 100){
            i.active = false;
            netDamage += (boss.attack + boss.attackBonus)*(character.smokePierceDefence + random(-2,0)/10)
        }
        pop();
            }
    }
    }
    for(var g of slashes){
        if(g.active && !timeup){
            push();
            strokeWeight(14);
            stroke("red");
            line(g.x1,g.y1,g.x2,g.y2);
            pop();
        }
        if(g.active && bossFight.phase == "combat" && boss.phase == 1 && !bossFight.playerTurn){
            push()
        strokeWeight(g.slashSize);
        stroke("black")
        line(g.x1, g.y1,g.x2,g.y2)
        g.slashSize+=1.5*g.expanding;
        if(g.slashSize>50){
            g.expanding = -2;
        }
        else if(g.slashSize <0){
            g.active = false;
//            character.smokeHealth -= g.attack * (character.smokeSlashDefence - random(-2,0)/10)
            netDamage +=  (boss.attack + boss.attackBonus) * (character.smokeSlashDefence + random(-2,0)/10)
        }
        pop()
        }
    }
    
    if(bossFight.phase == "combat"){
        if(mouseIsPressed && slash.x1 != 0 && ((character.currentCreature == "samurai" && bossFight.playerTurn) || (!bossFight.playerTurn && boss.phase == 1))){
            push()
            strokeWeight(10)
            stroke("white")
            line(slash.x1,slash.y1,mouseX,mouseY)
            pop()
        }
        
    }
    if(slashing){
        push()
        strokeWeight(slashSize);
        line(animSlash.x1, animSlash.y1,animSlash.x2,animSlash.y2)
        slashSize+=5*expanding;
        if(slashSize>30){
            expanding = -1;
        }
        else if(slashSize <0){
            slashing = false;
        }
        pop()
    }
    
    if(bossFight.phase == "damage"){
        if(bossFight.playerTurn){
            textSize(60)
            text(Math.floor(netDamage),1200,200)
        }else{
            textSize(60);
            text(Math.floor(netDamage),550,200);
        }
    }
    
    if(boss.buff !== false){
        push();
        textSize(50);
        var buffText = boss.buff;
        text(buffText.capitalize(),width/2,150)
        pop()
    }
        
        if(boss.phase == "dead"){
            textSize(60)
            text("Victory!",width/2-100,150)
        }
//    ellipse(width/2)
}else{
    fill("red");
    rect(0,0,width,height)
    fill("black")
    textSize(60);
    text("Game Over", width/2,height/2)
        drawSprites()

}
}else{
    drawSprite(titleScreen)
}
}
function createSelection(x,y,w,h,operation){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.operation = operation;
    
}
function demon(){
    this.health = 1000;
    this.attack = 14;
    this.phase = 1;
    this.pierceDefence = 1;
    this.slashDefence = 1;
    this.buff = false;
    this.buffSickness = false;
    this.swordCountered = false;
    this.spearCountered = false;
    this.attackBonus = 0;
    this.pierceDefenceBonus = 0;
    this.slashDefenceBonus = 0;
}
function makePunchTarget(x,y,c,s,ts){
    this.x = x;
    this.y = y;
    this.timeSize = ts;
    this.active = true;
    this.num = c;
    this.speedBonus = s;
}
function makeSlash(x,y,x2,y2,c){
    this.x1 = x;
    this.y1 = y;
    this.x2 = x2;
    this.y2 = y2
    this.active = true;
    this.num = c;
    this.expanding = 1;
    this.slashSize = 0;
}
function battle(){
    this.playerTurn = true;
    this.phase = "planning";
}
function targetLoop(){
     var bonus = 0;
    var speedBonus = 1;
    if(random(0,num-1)<currentNum){
            bonus = random(50,150)
            speedBonus = random(1,5)/10 + 1
        }
    punchTargets.push(new makePunchTarget(random(950,1450),random(250,750),currentNum + 1,speedBonus,300))
    if(currentNum < num){
        setTimeout(targetLoop,targetInterval + bonus)
        currentNum++
    }else{
        ready = true;
    }
}
function slashLoop(){
    thetaI = random(0,360);
    theta = random(0,360);
    while(dist(cos(thetaI)*200+1200,sin(thetaI)*200+500,cos(theta)*200+1200,sin(theta)*200+500) < 50){
        thetaI = random(0,360);
        theta = random(0,360)
    }
    slashes.push(new makeSlash(cos(thetaI)*200+1200,sin(thetaI)*200+500,cos(theta)*200+1200,sin(theta)*200+500,currentNum));
}
function demonSlashLoop(){
    thetaI = random(0,360);
    theta = random(0,360);
    while(dist(cos(thetaI)*200+600,sin(thetaI)*200+500,cos(theta)*200+600,sin(theta)*200+500) < 50){
        thetaI = random(0,360);
        theta = random(0,360)
    }
    slashes.push(new makeSlash(cos(thetaI)*200+600,sin(thetaI)*200+500,cos(theta)*200+600,sin(theta)*200+500,currentNum))
    if(currentNum < num){
        setTimeout(demonSlashLoop,targetInterval)
        currentNum++
    }else{
        ready = true;
    }
}
function generateTargets(){
    var countBonus = 0;
    if(boss.buff == "speed"){
        countbonus = -1;
    }
    currentNum = 0;
    netDamage = 0;
    num = random(5+countBonus,6+countBonus);
    combo = 0;
    targetInterval = random(400,550);
    setTimeout(targetLoop,targetInterval)
}
function demonTargetLoop(){
      var bonus = 0;
    var speedBonus = 1;
    if(random(0,num-1)<currentNum){
            bonus = random(50,150)
            speedBonus = random(1,5)/10 + 1
        }
    punchTargets.push(new makePunchTarget(random(350,850),random(250,750),currentNum + 1,speedBonus,0))
    if(currentNum < num){
        setTimeout(demonTargetLoop,targetInterval + bonus)
        currentNum++
    }else{
        ready = true;
    }
}
function generateDemonTargets(){
    punchTargets = [];
    currentNum = 0;
    var attackCountBonus = 0;
    var attackSpeedBonus = 0;
    boss.pierceDefenceBonus = 0;
    boss.slashDefenceBonus = 0;
    boss.attackBonus = 0;
    if(boss.buff == "speed"){
        attackSpeedBonus = -100;
        attackCountBonus += 2
        if(boss.swordCountered){
            attackCountBonus = -1;
        }
    }
    if(boss.buff == "barrier"){
        attackCountBonus = -1;
        boss.pierceDefenceBonus = -0.2;
        boss.slashDefenceBonus = -0.3;
    }
    if(boss.buffSickness == "barrier"){
        boss.attackBonus = 2;
    }
    if(boss.buffSickness == "haze"){
        if(boss.swordCountered || character.currentCreature == "samurai"){
            attackCountBonus = 1;
        }
    }
    if(boss.buff == "haze"){
        boss.pierceDefenceBonus = -0.2;
    }
    if(boss.buff == "minions"){
        attackCountBonus = 2;
        boss.attackBonus = 2;
        boss.slashDefenceBonus = -0.3
    }
        netDamage = 0;
    slashes = [];
    boss.spearCountered = false;
    boss.swordCountered = false;
    boss.buffSickness = false;
    num = random(6+attackCountBonus,7+attackCountBonus);
    targetInterval = random(500 + attackSpeedBonus,650 + attackSpeedBonus);
    setTimeout(demonTargetLoop,targetInterval);
}
function generateDemonSlashes(){
currentNum = 0;
    var attackCountBonus = 0;
    var attackSpeedBonus = 0;
    boss.pierceDefenceBonus = 0;
    boss.slashDefenceBonus = 0;
    boss.attackBonus = 0;
    if(boss.buff == "speed"){
        attackSpeedBonus = -100;
        attackCountBonus  += 2;
        if(boss.swordCountered){
            attackCountBonus += -1;
        }
    }
    if(boss.buff == "barrier"){
        attackCountBonus = -1;
        boss.pierceDefenceBonus = -0.2;
        boss.slashDefenceBonus = -0.3;
    }
    if(boss.buffSickness == "barrier"){
        boss.attackBonus = 2;
    }
    if(boss.buffSickness == "haze"){
        if(boss.swordCountered || character.currentCreature == "samurai"){
            attackCountBonus = 1;
        }
    }
    if(boss.buff == "haze"){
        boss.pierceDefenceBonus = -0.2;
    }
    if(boss.buff == "minions"){
        attackCountBonus = 2;
        boss.attackBonus = 2;
        boss.slashDefenceBonus = -0.3
    }
        netDamage = 0;
    slashes = [];
    boss.spearCountered = false;
    boss.swordCountered = false;
    boss.buffSickness = false;
    num = random(6+attackCountBonus,7+attackCountBonus);
    targetInterval = random(500 + attackSpeedBonus,600 + attackSpeedBonus);
    setTimeout(demonSlashLoop,targetInterval);
}
function generateSlashes(){
    timeup = false;
    currentNum = 1;
    netDamage = 0;
    num = 0;
    combo = 0;
    targetInterval = random(5500,6500);
    setTimeout(function(){timeup = true;
                          netDamage *= (combo/currentNum)
                          if(netDamage > 70 && boss.buff !== false){
                              boss.swordCountered = true;
                              if(boss.buff == "minion" || boss.buff == "haze"){
                                  boss.buffSickness = boss.buff;
                                  boss.buff = false;
                                  demonAbilitySprite.visible = false;
                              }
                          }
                Math.floor(netDamage);
                boss.health -= netDamage;
                          if(character.smoke){
                smokeDoubleSprite.changeAnimation('slash')
                smokeDoubleSprite.animation.frameDelay = 2;
                          }else{
                              characterSprite.changeAnimation('slash');
                              characterSprite.animation.frameDelay = 2;
                          }
//                transitionToDemon();
                bossFight.phase = "damage";
                         transitionToDemon()
                         },targetInterval)
    setTimeout(slashLoop,500)
    
    
    
}

function mainCharacterData(){
    this.mode = "neutral";
    this.currentCreature = false;
    this.smokeHealth = 200;
    this.smokePierceDefence = 1;
    this.smokeSlashDefence = 1;
    this.smoke = true;
    
    
}
function smokeCreature(tag,defence,attack){
    this.tag = tag;
    this.health = 100;
    this.defence = defence;
    this.damage = attack;
    this.alive = true;
}
function transitionToDemon(){
    console.log(new Date())
    setTimeout(function(){bossFight.phase = "planning";
                          bossFight.playerTurn = false;
                          num = 0;
                          slashes = [];
                          punchTargets = [];
                          currentNum = 0;
                          combo = 0;
                          ready = false;
                          if(boss.buff === false && boss.buffSickness === false){
                              boss.buff = random(demonBuffs)
                              demonAbilitySprite.visible = true;
                              demonAbilitySprite.changeAnimation(boss.buff);
                              if(boss.buff == "barrier" || boss.buff == "minion"){
                                  demonAbilitySprite.position.x = 1000;
                              }else{
                                  demonAbilitySprite.position.x = 1200;
                              }
                              demonAbilitySprite.animation.frameDelay = 8;
                          }
                          if(boss.health < 500 && boss.phase == 1){
                              boss.phase = 2;
                              //transition
                          }else if(boss.health <=0){
                              boss.phase = "dead"
                              boss.buff = false;
                              demonAbilitySprite.visible = false
                              demonSprite.changeAnimation('death');
                              demonSprite.animation.looping = false;
                              characterSprite.animation.frameDelay = 15;
                              smokeDoubleSprite.animation.frameDelay = 15;
                              demonSprite.animation.frameDelay = 15;
                              songs[selectedIndex].setLoop(false)
                          }
                          if(boss.phase != "dead"){
                        transitionToDefend();
                          }

                         },2000)
}
function transitionToDefend(){
    setTimeout(function(){if(!(boss.phase == "dead")){bossFight.phase = "combat";
                                                      slashes = [];
                                                      punchTargets = [];
                                                      currentNum = 0;
                                                      num = 0;
                                                      combo = 0;
                                                      ready = false;
                                                      if(boss.phase == 1){generateDemonSlashes()}else if(boss.phase == 2){generateDemonTargets()}}},500);
}
function transitionToDeath(){bossFight.phase = "dead";
                            characterSprite.changeAnimation('death')
                             characterSprite.animation.looping = false
                             characterSprite.animation.frameDelay = 8;
                             demonSprite.visible = false;
                             songs[selectedIndex].setLoop(false)
                             songs[selectedIndex].stop()
                             song.play()
                             song.loop()
                            }
function transitionToPlayer(){
    if(character.smokeHealth<=0 && character.smoke){
        smokeDoubleSprite.changeAnimation('death')
        smokeDoubleSprite.animation.looping = false;
    }
    setTimeout(function(){bossFight.phase = "planning";ready=false;num = 0; currentNum = 0;bossFight.playerTurn = true;if(character.smokeHealth <= 0){character.smoke = false;smokeDoubleSprite.visible = false;characterSprite.position.x = 600}},2000)
}
function mousePressed(){
    if(bossFight.playerTurn && bossFight.phase == "planning"){
        if(selectingCreature){
            if(collidePointCircle(mouseX,mouseY,width/2-425,625,100,100)){//boxer
                character.currentCreature = "boxer";//spear
            }else if(collidePointCircle(mouseX,mouseY,width/2 - 300, 625,100,100)){//ninja
//                character.currentCreature = "ninja";
            }else if(collidePointCircle(mouseX,mouseY,width/2 -175,625,100,100)){//samurai
                character.currentCreature = "samurai";
            }
        }
        selectingCreature = false;

    if(collidePointCircle(mouseX,mouseY, width/2, 750, 100,100) && character.currentCreature !== false){
        bossFight.phase = "pause";
        setTimeout(function(){bossFight.phase = "combat";if(character.currentCreature == "boxer"){generateTargets()}else if(character.currentCreature == "samurai"){generateSlashes()};},500)
    }else if(collidePointCircle(mouseX,mouseY,width/2 - 300,750,100,100)){
//        console.log("ye")
        selectingCreature = true;
    }else {
        selectingCreature = false;
    }
    
        
    }else if(bossFight.phase == "combat" && bossFight.playerTurn){
        if(character.currentCreature == "boxer"){
        for(var i of punchTargets){
            if(collideCircleCircle(mouseX,mouseY,30,i.x,i.y,100)){
                i.active = false;
                if(i.timeSize < 90){
                    netDamage += spearSmoke.damage * 0.8 * (boss.pierceDefence+boss.pierceDefenceBonus + random(-2,0)/10);
                    combo += 1;
                }else if(i.timeSize < 105){
                    combo += 2;
                    netDamage += spearSmoke.damage * (boss.pierceDefence+boss.pierceDefenceBonus + random(-2,0)/10);
                }else if(i.timeSize < 120){
//                    combo += 1;
                    netDamage += spearSmoke.damage * 0.7 * (boss.pierceDefence+boss.pierceDefenceBonus + random(-2,0)/10);
                }else{
                    if(combo > 0){}
//                    combo -= 1;
                }
            }
        }
        if(punchTargets.every(function(e){return !e.active}) && ready){
            punchTargets = [];
            if(character.smoke){
            smokeDoubleSprite.changeAnimation('stab')
            smokeDoubleSprite.animation.frameDelay = 2;
            smokeDoubleSprite.scale = 1;
            }else{
                characterSprite.changeAnimation('stab')
            characterSprite.animation.frameDelay = 2;
            characterSprite.scale = 1;
            }
            setTimeout(function(){
                ready = false;
//                console.log(combo)
//                console.log(boss.pierceDefence)
//                console.log(spearSmoke.damage)
                netDamage *= (combo/num)
                Math.floor(netDamage);
                if(netDamage > 70 && boss.buff !== false){
                    boss.spearCountered = true;
                    if(boss.buff == "speed" || boss.buff == "haze" || boss.buff == "barrier"){
                        boss.buffSickness = boss.buff;
                        boss.buff = false;
                        demonAbilitySprite.visible = false
                    }
                }
                boss.health -= netDamage;
                bossFight.phase = "damage";
                transitionToDemon();
            },500)
        }
    }else if(character.currentCreature == "samurai"){
        slash.x1 = mouseX;
        slash.y1 = mouseY;
        
        
    }
    }else if(bossFight.phase == "combat" && !bossFight.playerTurn){
        if(boss.phase == 1){
            slash.x1 = mouseX;
            slash.y1 = mouseY;
            
        }else if(boss.phase == 2){
            for(var i of punchTargets){
            if(collidePointCircle(mouseX,mouseY,i.x,i.y,100)){
                i.active = false;
            }
            }if(punchTargets.every(function(e){return !e.active}) && ready){
            punchTargets = [];
                demonSprite.changeAnimation('slash')
            demonSprite.animation.frameDelay = 3;
            setTimeout(function(){
                if(character.smoke){
                ready = false;
                 character.smokeHealth -= Math.floor(netDamage);
                bossFight.phase = "damage";
                transitionToPlayer();
            }else if(Math.floor(netDamage) > 0){
                bossFight.phase = "damage";
                transitionToDeath()
            }else{
                ready = false;
                bossFight.phase = "damage";
//                transitionToDemon();
                transitionToPlayer()
                }
            },500)
        }
        }
        
    }
    
}

function mouseReleased(){
    if(bossFight.phase == "combat" && bossFight.playerTurn){
        if(character.currentCreature == "samurai" && !timeup){
        slash.x2 = mouseX;
        slash.y2 = mouseY;
            for(var g of slashes){
                if(g.active){
                    if(collideLineCircle(slash.x1,slash.y1,slash.x2,slash.y2,g.x1,g.y1,60) && collideLineCircle(slash.x1,slash.y1,slash.x2,slash.y2,g.x2,g.y2,60)){
            netDamage += swordSmoke.damage * (boss.slashDefence + random(-2,0)/10)
            combo += 2
        }
//                    else if(collideLineCircle(slash.x1,slash.y1,slash.x2,slash.y2,g.x1,g.y1,50) && collideLineCircle(slash.x1,slash.y1,slash.x2,slash.y2,g.x2,g.y2,50)){
//            netDamage += swordSmoke.damage * 0.8 * (boss.slashDefence + random(-2,0)/10)
//            combo += 1;
//        }else if(collideLineCircle(slash.x1,slash.y1,slash.x2,slash.y2,g.x1,g.y1,60) && collideLineCircle(slash.x1,slash.y1,slash.x2,slash.y2,g.x2,g.y2,60)){
//            netDamage += swordSmoke.damage * 0.7 * (boss.slashDefence + random(-2,0)/10)
//            combo += 1;
//        }else{
////            combo -= 1;
//        }
            }
        }
            if(!timeup){
        g.active = false;
        
        currentNum++
        slashing = true;
        animSlash = slash;
        expanding = 1;
        slashLoop()
        }
        
    }
}else if(bossFight.phase == "combat" && !bossFight.playerTurn){
    if(boss.phase == 1){
        slash.x2 = mouseX;
        slash.y2 = mouseY;
        for(var g of slashes){
            if(g.active){
            if(collideLineLine(slash.x1,slash.y1,slash.x2,slash.y2,g.x1,g.y1,g.x2,g.y2)){
                g.active = false;
            }
            }
        }
        if(slashes.every(function(e){return !e.active}) && ready){
            slashes = [];
            demonSprite.changeAnimation('slash')
            demonSprite.animation.frameDelay = 3;
            setTimeout(function(){
                if(character.smoke){
                character.smokeHealth -= Math.floor(netDamage);
                    ready = false;
                bossFight.phase = "damage";
                transitionToPlayer();
                }else if(Math.floor(netDamage) > 0){
//                    gameOver = true;
//                    console.log("E")
                    bossFight.phase = "damage";
                    transitionToDeath();
                }else{
                ready = false;
                bossFight.phase = "damage";
//                transitionToDemon();
                transitionToPlayer()
                }
            },500)
        }
    }
}
}