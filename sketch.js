var player
var ground, ground1, ground2, ground_image, groundGroup;
var apple, apple_image, applesGroup, goldenApple, goldenApple_image;
var island, island_image, islandWidth, islandsGroup;
var banyanTree, banyanTree_image;
var tree, tree_image, tree2_image, tree3_image, tree4_image, tree5_image, treeNumber;
var bird, bird_image, bird2_image, bird3_image, birdNumber, birdY, birdsGroup, birdsGroup2;
var crow, crow_image;
var eagle, eagle_image
var goldenApple, goldenApple_image;
var wizard, wizard_image, fire, fire_image;
var nightSky, nightSky_image;
var sky, sky_image;
var health = 100;
var score;
var gameState = START;
var START;
var PLAY;
var END;
var message, message2, message3, message4, message5;

var skyNumber = 2;

function preload(){
sky_image = loadImage("sky.jpg");
nightSky_image = loadImage("nightSky.jpg");
ground_image = loadImage("ground.jpg");
apple_image = loadImage("apple.jpg");
goldenApple_image = loadImage("goldenApple.jpg");
tree_image = loadImage("tree.png");
tree2_image = loadImage("tree2.jpg");
tree3_image = loadImage("banyanTree.jpg");
island_image = loadImage("ground.jpg");
bird_image = loadImage("birdsFlying.jpg");
bird2_image = loadImage("crow.jpg");
bird3_image = loadImage("eagle.jpg");
wizard_image = loadImage("wizard.jpg");
fire_image = loadImage("fire.jpg");

}

function setup() {
  createCanvas(800, 700);

//skyNumber = Math.round(random(1,2));
//switch(skyNumber){
  //  case 1: background(sky_image); 
	//	    break;
	//case 2: background(nightSky_image);
	  //      break;
//}

player = createSprite(60, 600, 40, 40);

ground = createSprite(700, 650, 1000, 20);
ground1 = createSprite(300, 650, 1000, 20)
ground2 = createSprite(100, 650, 500, 20);
ground1.addImage("ground", ground_image);
ground2.addImage("ground", ground_image);
ground.addImage("ground", ground_image);
ground.scale = 0.21;
ground1.scale = 0.21;
ground2.scale = 0.21;

applesGroup = new Group();
groundGroup = new Group();
islandsGroup = new Group();
birdsGroup = new Group();
birdsGroup2 = new Group();

}

function draw() {

bg();

if(gameState === START){
fill("white");
textSize(25);
message = text("You ready? Got your water?", 270, 200);
textSize(20);
message2 = text("You haven't? Go get some then! The game isn't going anywhere.", 125, 250);
message3 = text("*awkward waiting*", 350, 300)
message4 = text("Have you got your water? Alright then, just press the left arrow key.", 125, 350);
textSize(25);
message5 = text("Have fun!", 380, 400);
}

if(keyDown(LEFT_ARROW) && gameState === START){
	gameState === PLAY;
    message.visible = false;
	message2.visible = false;
	message3.visible = false;
	message4.visible = false;	
	message5.visible = false;
  }

if(gameState === PLAY){

//console.log(ground1.x);

background(sky_image);

	if(ground.x < 600){
	   ground.x = 700;
	   ground1.x = 300;
	   ground2.x = 100;
	}

	if(ground1.x < 400)

	trees();
	islands();
	birds();
	wizards();
	goldenApple();

	score = Math.round(frameCount % 500);

	textSize(15);
    text("Health: " + health, 360, 20);
    text("Score: " + score, 440, 20);

	//console.log(ground.x);

	if(keyIsDown(LEFT_ARROW)){
	//	ground.velocityX = -4;
		ground.velocityX = -frameCount%300-100;
		ground1.velocityX = -frameCount%300-100;
		ground2.velocityX = -frameCount%300-100;
	}

	player.velocityX = 0.8;

	if(keyDown(UP_ARROW)){
		player.velocityY = -2;
	}
	player.velocityY -= 0.08;

	if(frameCount % 1000 === 0){
		apple = createSprite(705, 600, 20, 20);
		bg();
		apple.velocityX = -frameCount%300-100;
		apple.addImage("apple", apple_image);
		apple.scale = 0.035;
		score += 5;
		if(apple.x > 0){
			apple.lifeTime = 0;
		}  
		applesGroup.add(apple);
	}

	if(player.isTouching(applesGroup)){
	   applesGroup.destroyEach();
	   health += 20;
	   score += 5;
	   textSize(24);
	   text("Nom nom nom..", 340, 350);
	}

	if(player.isTouching(goldenApple)){
		goldenApple.lifeTime = 0;
		health = 100;
		player.score += 10;
		textSize(25);
		text("W H A T", 350, 350);
	}

	if(player.isTouching(birdsGroup)){
		health -= 5;
	}

	   if(player.isTouching(fire)){
		   fire.lifeTime = 0;
		   health -= 20;
	   }

	   if(health === 0){
		   gameState === END
	   }
}

if(gameState === END){
	textSize(25);
	text("Game Over", 350, 350);
	textSize(20);
	text("I hope you enjoyed! Press the right arrow key to restart.", 320, 420);
	if(keyDown(RIGHT_ARROW)){
		gameState = START;
	}
}

	player.collide(ground);
	player.collide(ground1);
	player.collide(ground2);
	player.collide(island);
	  
  drawSprites();
}

function bg(){
//	skyNumber = Math.round(random(1,2));
//	switch(skyNumber){
//		case 1: background(sky_image); 
//				break;
//		case 2: background(nightSky_image);
//				break;
//  }
	if(frameCount % 10000 === 0){
		skyNumber += 1;
			if(skyNumber % 2 === 0){
				background(sky_image);
			}
			else background(nightSky_image);
	}
}

function trees(){
	if(frameCount % 150 === 0){
		tree = createSprite(820, 585, 30, 30);
		treeNumber = Math.round(random(1, 3))
		switch(treeNumber){
			case 1: tree.addImage("tree1", tree_image);
					tree.scale = 0.15;
					tree.y = 590;
					break;
			case 2: tree.addImage("tree2", tree2_image);
					tree.scale = 0.09;
					break;
			case 3: tree.addImage("tree3", tree3_image);
					tree.scale = 0.09;		
					break;			
		}
		tree.velocityX = -frameCount%300-100;
		if(tree.x > 0){
			tree.lifeTime = 0;
		}
	}
	if(frameCount % 200 === 0){
		tree = createSprite(820, 450, 30, 30);
		treeNumber = Math.round(random(1, 3))
		switch(treeNumber){
			case 1: tree.addImage("tree1", tree_image);
			        tree.scale = 0.1;
					break;
			case 2: tree.addImage("tree2", tree2_image);
					tree.scale = 0.09;
					tree.y = 430;
					break;
			case 3: tree.addImage("tree3", tree3_image);
					tree.y = 430;
					tree.scale = 0.09;		
					break;			
		}
		tree.velocityX = -frameCount%300-100;
		if(tree.x > 0){
			tree.lifeTime = 0;
		}
	}
}

function islands(){
	if(frameCount % 2000 === 0){
	   islandWidth = Math.round(random(1, 3))
	   switch(islandWidth){
			case 1: islandWidth = 100;
					break;
			case 2: islandWidth = 200;
					break;
			case 3: islandWidth = 300;
			        break;
	    }

		island = createSprite(900, 500, islandWidth, 40);
		island.addImage("island", island_image);
		island.velocityX = -frameCount%300-100;
		island.scale = 0.17;
		if(island.x > 0){
			island.lifeTime = 0;
		}
		islandsGroup.add(island);
	}
}

function birds(){
	if(frameCount % 250 === 0){
	    birdY = Math.round(random(100, 400))	
	    bird = createSprite(805, birdY, 20, 20);
	    bird.addImage("bird", bird_image);
	    bird.velocityX = -frameCount%300-100;
        if(bird.x > 0){
		   bird.lifeTime === 0;
		birdsGroup.add(bird);  
	   }
	}
	if(frameCount % 200 === 0){
	    bird = createSprite(820, 560, 20, 20);
	    birdNumber = Math.round(random(1, 2))
	    switch(birdNumber){
		    case 1: bird.addImage("bird", bird2_image);
					break;
			case 2: bird.addImage("bird", bird3_image);
					break;
	   }
		bird.velocityX = -frameCount%300-100;
		birdsGroup2.add(bird);
	}
}

function wizards(){
    if(frameCount % 200 === 0){
	    wizard = createSprite(515, 580, 30, 30);
	    wizard.addImage("wizard", wizard_image);
	    wizard.velocityX = -frameCount%300-100;
	   	wizard.scale = 0.09;
		if(wizard.x > 0){
		   wizard.lifeTime = 0;
	   }
        if(wizard.x === 660)
	   fire = createSprite(wizard.x - 20, 580, 20, 20);
	   fire.addImage("fire", fire_image);
	   fire.velocityX = -frameCount%500-100;
	   fire.scale = 0.07;
	   if(fire.x > 0){
		   fire.lifeTime = 0;
	   }
	}
}

function goldenApple(){
    if(frameCount % 10000 === 0){
		goldenApple = createSprite(705, 600, 20, 20);
		goldenApple.addImage("goldenApple", goldenApple_image);
		goldenApple.velocityX = -frameCount%300-100;
		goldenApple.scale = 0.07;
		if(goldenApple.x > 0){
			goldenApple.lifeTime = 0;
		}
	}

}

//To do
//Sky Islands function: done
//Trees function: done
//Birds function: eh its done
//Wizard spawn function: done
//Wizard hostilities: done
//Wizard fire: dun dun dooone
//Golden apple spawn function: done
//bugs, but I'm too tired
//Redited pictures
//Game features and such: done