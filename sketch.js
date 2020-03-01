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
var spearSmoke = new smokeCreature("spear",10, 15);
var swordSmoke = new smokeCreature("sword",10, 20);
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
 document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13 && document.fullscreenElement === null) {
      document.getElementById("mainScreen").requestFullscreen();
         
    }
  }, false);

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    characterSprite = createSprite(300,500,500,500)
//    smokeNinjaSprite = createSprite(600,500,500,500)//need to position later
//    smokeNinjaSprite.visible = false;
//    smokeSamuraiSprite = createSprite(600,500,500,500);
//    smokeSamuraiSprite.visible = false;
    smokeDoubleSprite = createSprite(600,500,500,500)
//    smokeBoxerSprite.visible = false; 
    demonSprite = createSprite(1200,500,500,500)
    
}

function draw() {
    resizeCanvas(windowWidth, windowHeight);
    background("green");
    if(!gameOver){
    push();
    if(bossFight.playerTurn && bossFight.phase == "planning"){
    translate((width/2 - mouseX)/30,0);
    }
    
    drawSprites();
    pop();
    fill("red");
    if(bossFight.playerTurn && bossFight.phase == "planning"){
    ellipse(width/2 - 300,750,100,100)//pipe
    ellipse(width/2, 750, 100,100)//battle
        if(selectingCreature){
            ellipse(width/2-425,625,100,100)//boxerSelection
//            ellipse(width/2 - 300, 625,100,100)//ninja selection
            ellipse(width/2 -175,625,100,100)//samurai selection
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
            netDamage +=  boss.attack * (character.smokeSlashDefence + random(-2,0)/10)
        }
        pop()
        }
    }
    
    if(bossFight.phase == "combat"){
        if(mouseIsPressed && slash.x1 != 0 && (character.currentCreature == "samurai" || (!bossFight.playerTurn && boss.phase == 1))){
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
        text(boss.buff,width/2,150)
    }
//    ellipse(width/2)
}else{
    fill("red");
    rect(0,0,width,height)
    fill("black")
    textSize(60);
    text("Game Over", width/2,height/2)
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
    this.health = 2000;
    this.attack = 15;
    this.phase = 2;
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
    slashes.push(new makeSlash(cos(thetaI)*200+1200,sin(thetaI)*200+500,cos(theta)*200+1200,sin(theta)*200+500,currentNum));
}
function demonSlashLoop(){
    thetaI = random(0,360);
    theta = random(0,360);
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
    num = random(5+attackCountBonus,6+attackCountBonus);
    targetInterval = random(500 + attackSpeedBonus,600 + attackSpeedBonus);
    setTimeout(demonTargetLoop(),targetInterval);
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
    num = random(5+attackCountBonus,6+attackCountBonus);
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
                              }
                          }
                Math.floor(netDamage);
                boss.health -= netDamage;
                transitionToDemon();
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
    setTimeout(function(){bossFight.phase = "planning";bossFight.playerTurn = false;transitionToDefend();if(boss.buff === false && boss.buffSickness === false){boss.buff = random(demonBuffs)}},2000)
}
function transitionToDefend(){
    setTimeout(function(){bossFight.phase = "combat";currentNum = 0;num = 0;combo = 0;if(boss.phase == 1){generateDemonSlashes()}else if(boss.phase == 2){generateDemonTargets()}},500);
}
function transitionToDeath(){bossFight.phase = "dead"}
function transitionToPlayer(){
    setTimeout(function(){bossFight.phase = "planning";bossFight.playerTurn = true;if(character.smokeHealth <= 0){character.smoke = false;smokeDoubleSprite.visible = false;characterSprite.x = 600}},2000)
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
            if(collidePointCircle(mouseX,mouseY,i.x,i.y,100)){
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
                    if(combo > 0)
                    combo -= 1;
                }
            }
        }
        if(punchTargets.every(function(e){return !e.active}) && ready){
            punchTargets = [];
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
            setTimeout(function(){
                if(character.smoke){}
                ready = false;
                Math.floor(netDamage);
                if(netDamage > 70 && boss.buff !== false){
                    boss.spearCountered = true;
                    if(boss.buff == "speed" || boss.buff == "haze" || boss.buff == "barrier"){
                        boss.buffSickness = boss.buff;
                        boss.buff = false;
                    }
                }
                boss.health -= netDamage;
                bossFight.phase = "damage";
                transitionToDemon();
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
                    if(collideLineCircle(slash.x1,slash.y1,slash.x2,slash.y2,g.x1,g.y1,30) && collideLineCircle(slash.x1,slash.y1,slash.x2,slash.y2,g.x2,g.y2,30)){
            netDamage += swordSmoke.damage * (boss.slashDefence + random(-2,0)/10)
            combo += 2
        }else if(collideLineCircle(slash.x1,slash.y1,slash.x2,slash.y2,g.x1,g.y1,50) && collideLineCircle(slash.x1,slash.y1,slash.x2,slash.y2,g.x2,g.y2,50)){
            netDamage += swordSmoke.damage * 0.8 * (boss.slashDefence + random(-2,0)/10)
            combo += 1;
        }else if(collideLineCircle(slash.x1,slash.y1,slash.x2,slash.y2,g.x1,g.y1,60) && collideLineCircle(slash.x1,slash.y1,slash.x2,slash.y2,g.x2,g.y2,60)){
            netDamage += swordSmoke.damage * 0.7 * (boss.slashDefence + random(-2,0)/10)
            combo += 1;
        }else{
            combo -= 1;
        }
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
            setTimeout(function(){
                if(character.smoke){
                character.smokeHealth -= Math.floor(netDamage);
                    ready = false;
                bossFight.phase = "damage";
                transitionToPlayer();
                }else if(Math.floor(netDamage > 0)){
//                    gameOver = true;
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