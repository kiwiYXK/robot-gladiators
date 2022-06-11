var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = 50;
var enemyAttack = 12;

/* console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]); */

// fight function (now with parameter for enemy's name)
var fight = function(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerMoney for skipping
        
        playerMoney = Math.max(0, playerMoney - 10);//never display a negative health or money value.
        console.log("playerMoney", playerMoney);
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    //never display a negative health or money value.
    var damage = randomNumber(playerAttack - 3, playerAttack);
     enemyHealth = Math.max(0, enemyHealth - damage);
  
    console.log(
      playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemyAttack - 3, enemyAttack);
    playerHealth = Math.max(0, playerHealth - damage);
    console.log(
      enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + ' still has ' + playerHealth + ' health left.');
    }
  } // end of while loop
}; // end of fight function

// fight each enemy-robot by looping over them and fighting them one at a time
var startGame = function(){
  playerHealth = 100;
  playerAttack = 10; 
  playerMoney = 10 ; 
for (var i = 0; i < enemyNames.length; i++) {
  // if player is still alive, keep fighting
  if (playerHealth > 0) {
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
    window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

    // pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];

    // reset enemyHealth before starting new fight
    enemyHealth = randomNumber(40,60);// 0-1的随机数 乘 21 表示有可能最低值是0，那么加上40 生命值就是40.
            // floor是四舍五入取整数值             有可能随机值最高是20.那么加40  生命值就是60。  

    // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyName);
  
    if (playerHealth > 0 && i < enemyNames.length - 1) {
      // ask if player wants to use the store before next round
      var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
    
      // if yes, take them to the store() function
      if (storeConfirm) {
        shop();
      }
  }
}
  // if player isn't alive, stop the game
  else {
    window.alert('You have lost your robot in battle! Game Over!');
    break;
  }
}

  endGame();
}; 

var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
  } 
  else {
    window.alert("You've lost your robot in battle.");
  }

var playAgainConfirm = window.confirm("Would you like to play again?");

if (playAgainConfirm) {
  // restart the game
  startGame();
} else {
  window.alert("Thank you for playing Robot Gladiators! Come back soon!");
}
}

var shop = function() {
var shopOptionPrompt = window.prompt("Whould you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Pleash enter one:'REFILL','UPGRADE',or 'LEAVE' to make a choice.");

switch(shopOptionPrompt) {
  case"REFILL":
  case"refill":
  if(playerMoney>= 7){
    window.alert("Refilling player's health by 20 for 7 dollars.");
    playerHealth += 20;
    playerMoney -= 7;
  }else {
    window.alert("You don't have enough money!");
  }
    break;

  case"UPGRADE":
  case"upgrade":
  if(playerMoney>= 7){
  window.alert("Upgrading player's attack by 6 for 7 dollars.");
  playerAttack = playerAttack + 6;
  playerMoney = playerMoney - 7;
  }else {
    window.alert("You don't have enough money!");
  }
    break;
    case"LEAVE":
  case 'leave':
    window.alert("Leaving the store.");
    break;
  default:
    window.alert("You did not pick a valid option. Try again.");
    shop();
    break;
}            
};
var randomNumber = function(min,max) {
  var value = Math.floor(Math.random() * (max - min +1 ) +min);

  return value;
};
startGame();
