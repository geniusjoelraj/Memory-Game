//Toggle Between Mute and Volume Button
$(".volume").on("click", function() {
  if ($(".volume").attr("src") === "images/volume.png" ){
    $(".volume").attr("src", "images/mute.png");
    
  } else {
    $(".volume").attr("src", "images/volume.png"); 
  }
  if ($(".box").muted == false) {
    $(".box").muted = true;
  }
  else{
    $(".box").muted = false;
  }
});

$(".box").click(function() {
  var clickSound = new Audio("sounds/select-sound.mp3");
  clickSound.play();
});


//Go to the Game page after clicking on start button
$(".start").on("click", function() {
  $(".top-container").css("display", "none");
  $(".game-container").css("display", "block");
});

//Declaring an empty lists and starting level
var pattern = [];
var levelNo = 1;
var userInput = [];

//Adds the next pattern randomly
function addNext() {
  pattern.push(Math.floor(Math.random()*9)+1);
}

addNext();
 
//Resets the contents inside 'userInput' and plays the pattern animation
function playPattern() {
  userInput = [];
  for (let i=0; i < pattern.length; i++) {
    setTimeout(function(){
      $("#box-"+pattern[i]).addClass("color-transition");
    },600 * i);
    setTimeout(function(){
      $("#box-"+pattern[i]).removeClass("color-transition");
    },(600 * i) + 200);
  }
}

//Calls the function after starting the game
$(".start").click(function(){
  setTimeout(playPattern, 1000); 
});


$(".box").click(function() {
  //gets the id of the button clicked
  let boxId = this.id;
  setTimeout(function(){
    $("#"+boxId).addClass("color-transition");
  },0);
  //Setting an delay of 200 milliseconds before the class is removed
  setTimeout(function(){
    $("#"+boxId).removeClass("color-transition");
  },200);

  //Gets the number of the box pressed and converts it into a string and push it into userInput
  let boxNum = parseInt(boxId.charAt(boxId.length-1));
  userInput.push(boxNum);
  
  for (let i = 0;i <= pattern.length;i++){
    //Checking if the player clicks the correct pattern
    if (userInput[userInput.length-1] === pattern[userInput.length-1]) {
     //pass 
    }
    else{
      //Displays Game over when the player loses
      var overSound = new Audio("sounds/error.mp3");
      overSound.play();
      setTimeout( function() {
        $(".overlay-red").css("display", "block");
      },100);
      setTimeout( function() {
        $(".overlay-red").css("display", "none");
      },300);
      $(".game-container").css("display", "none");
      $(".final-level").text(levelNo);
      $(".gameOver-container").css("display", "flex");
    }  
  }
  if (pattern.length === userInput.length) {
    //Activates the next level
    levelNo++;
    setTimeout( function() {
      $(".overlay-white").css("display", "block");
    },300);
    setTimeout( function() {
      $(".overlay-white").css("display", "none");
    },500);
    $(".levelNo").text(levelNo);  
    addNext();
    setTimeout(playPattern, 1000); 
  }
});

$(".try-again").click(function() {
  $(".top-container").css("display", "flex");
  $(".gameOver-container").css("display", "none");
  pattern = [];
  levelNo = 1;
  $(".levelNo").text(levelNo);
  userInput = [];
  addNext();
  $(document).ready(playPattern);
});