var splashscreen
var gameState = "wait"
var infobutton, playbutton
var level1img
var player, playerimg,weaponGroup
var playerhealth =300
var playermaxHealth=300
var enemy, enemyimg, enemy2img, enemyGroup
var weapon,weaponimg
var zombieHealth =300
var zombieHealthMax=300

// loading assets like images sound videos etc
function preload() {
    splashscreen = loadImage("INTROSCREEN.gif")
    level1img = loadImage("bg.gif")
    playerimg = loadImage("INPLACEGIRL.png")
    enemyimg = loadImage("DUCK.png")
    enemy2img = loadImage("duck2.png")
    weaponimg=loadImage("bread1.png")

    // load the images of rewards and enemies


}


// setting up the game like creating canvas, sprites, button etc
function setup() {
    createCanvas(windowWidth, windowHeight);

    playbutton = createImg("PLAYBUTTON.png")
    playbutton.position(width/3,height-height/4)
    playbutton.size(150, 150)


    infobutton = createImg("MENUBUTTON.png")
    infobutton.position(width/2,height-height/4)
    infobutton.size(148, 148)

    // player sprite
    player=createSprite(100,height-200)
    player.addImage(playerimg)
    player.visible = false
    player.scale = 0.75
// player.debug=true
player.setCollider('rectangle',0,0,200,player.height)


    //create sprites for  of rewards and enemies

    enemyGroup = new Group()
    weaponGroup= new Group()

    invisibleGround = createSprite(width / 2, height- 50, width, 20)
    invisibleGround.visible = false


}


// this function runs on every frame till the codes are running
function draw() {
    player.collide(invisibleGround)
    if (gameState == "wait") {

        background(splashscreen)
        playbutton.show()
        infobutton.show()

    }


    playbutton.mousePressed(() => {
        playbutton.hide()
        infobutton.hide()
        gameState = "level1"
    })

    infobutton.mousePressed(() => {
        playbutton.hide()
        infobutton.hide()
        waitpopup()
    })

    if (gameState == "level1") {
        background(level1img)
        player.visible = true
        playermovement()
        spawnEnemies()
        healthBar(50,50,playerhealth,playermaxHealth,"blue")
        healthBar(width-350,50,zombieHealth,zombieHealthMax,"#6cc417")
        
if(player.isTouching(enemyGroup)){
    playerhealth -=10
    enemyGroup.destroyEach()
 }

 if(weaponGroup.isTouching(enemyGroup)){
   zombieHealth -=10
    enemyGroup.destroyEach()
    weaponGroup.destroyEach()
 }
  

 if(playerhealth >=150 && zombieHealth <=200){
    enemyGroup.destroyEach()
    weaponGroup.destroyEach()
    
    win()
    
    }

    }

    drawSprites()


    if (gameState == "level1") {
        fill("navy")
        textSize(50)
        text("Level 1", width / 2, 50)



    }




}


function waitpopup() {
    swal({
        title: "Info !",
        text: "This game is made in a couple of weeks! \n In this game you run forward and throw duck on bread",
        imageUrl: "COWGIRLRUNNING.gif",
        imageSize: '200x200',
        confirmButtonText: "Back to Dashboard",
        confirmButtonColor: "Navy"
    },

        function () {
            gameState = "wait"
        }
    )


}


function playermovement() {

    if (keyDown("RIGHT_ARROW")) {
        player.x += 5
    }

    if (keyDown("LEFT_ARROW")) {
        player.x -= 5
    }
    if (keyDown("UP_ARROW")) {
        player.velocityY = -5
    }
    player.velocityY += 0.8
  
  
       if(keyDown("space")){
       shoot()
       }
}


function spawnEnemies() {
    if (frameCount % 150 == 0) {
        randy = Math.round(random(50, height - 100))
        enemy = createSprite(width - 100, height - 200)
        enemy.velocityX = -9
        enemy.scale=.75
        // enemy.debug=true
// enemy.debug = true
enemy.setCollider('rectangle',0,0,100,200)

        randimage = Math.round(random(1, 2))

        switch (randimage) {

            case 1: enemy.addImage(enemyimg)
                break;

            case 2: enemy.addImage(enemy2img)
            enemy.scale =1.5
                break;


            default: break;
        }
        enemyGroup.add(enemy)
    }
}

function healthBar(x,y,h,mx,clr){

    noFill()
    stroke("black")
    strokeWeight(2)
    rect(x,y,mx,20)
    fill(clr)
      rect(x,y,h,20)
 
 }

 function shoot() {
if(frameCount%10==0){
    weapon= createSprite(player.x,player.y)
  //   dust.addImage()
  
  weapon.velocityX +=10
//   translate(width / 2, height / 2); 
weapon.addImage(weaponimg)
weapon.scale=0.5
  weapon.rotationSpeed = 15;
player.depth=weapon.depth
weapon.depth -=1

  weaponGroup.add(weapon)
}
  
  }

  function win() {
    swal(
      {
        title: `Game Over!!!`,
        text: "Thanks for playing!!",
        imageUrl:"DUCK.png",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function (isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }