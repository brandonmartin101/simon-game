var compPattern = [], myPattern = [], strictMode = 0, myCount = 1;
var sound1 = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
var sound2 = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
var sound3 = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
var sound4 = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";

$(document).ready(function() {
  $("#button-start").click(function() {
    compPattern = [], myPattern = [], myCount = 1;
    $("#win-count").html(myCount);
    addToCompPattern();
  });

  $("#button-strict").click(function() {
    if (strictMode === 1) {
      strictMode = 0;
      $("#button-strict").addClass("disabled");
    } else {
      strictMode = 1;
      $("#button-strict").removeClass("disabled");
    }
  });
  
  $(".block-color").click(function() {
    myPattern.push(this.id);

    // light up game piece
    lightUp(this.id);
    
    // once myPattern matches length of compPattern, test if they're the same
    if (myPattern.length === compPattern.length) {
      // test if patterns match
      var match = true;
      for (var i=0; i<myPattern.length; i++) {
        if (myPattern[i] !== compPattern[i]) match = false;
      }
      
      if (match) {
        myCount++;
        if (myCount === 21) {
          // congratulate the win
          $("#win-count").html("20!")
          setTimeout(function() {
            $("#win-count").html("You");
          }, 2000);
          setTimeout(function() {
            $("#win-count").html("win!");
          }, 4000);
          setTimeout(function() {
            $("#button-start").click();
          }, 6000);
        } else {
          // continue
          setTimeout(function() {
            $("#win-count").html(myCount);
            myPattern = [];
            addToCompPattern();
          }, 1000);
        }
      } else {
        // pattern match failed
        if (strictMode === 0) {
          // reset myPattern if not strict
          myPattern = [];
          // play compPattern again to remind the player
          setTimeout(function() {
            playCompPattern();
          }, 2000);
          countError();
        } else {
          //reset game if strict
          countError();
          setTimeout(function() {
            $("#button-start").click();
          }, 1000);
        }
      }
    }
  })
});

function addToCompPattern() {
  var initSeed = Math.floor(Math.random() * 4);
  if (initSeed === 0) {
    compPattern.push("green");
  } else if (initSeed === 1) {
    compPattern.push("red");
  } else if (initSeed === 2) {
    compPattern.push("yellow");
  } else {
    compPattern.push("blue");
  }
  playCompPattern();
}

function playCompPattern() {
  var i = -1, maxLoops = compPattern.length;
  (function next() {
    if (i++ >= maxLoops - 1) return;

    setTimeout(function() {
      lightUp(compPattern[i]);
      next();
    }, 1000);
  })();
}

function lightUp(color) {
  var button = "#"+color;
  $(button).addClass("bright");
  playSound(color);
  setTimeout(function() {
    $(button).removeClass("bright");
  }, 500);
}

function playSound(color) {
  // play's the button's designated sound
  var audio;
  if (color === "yellow") {
    audio = new Audio(sound1);
  } else if (color === "blue") {
    audio = new Audio(sound2);
  } else if (color === "green") {
    audio = new Audio(sound3);
  } else {
    audio = new Audio(sound4);
  }
  audio.play();
}

function countError() {
  // run this if player messes up pattern
  $("#win-count").html("X");
  setTimeout(function() {
    $("#win-count").html(myCount);
  }, 2000);
}