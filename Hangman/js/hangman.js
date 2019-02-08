//VARIABLES
var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = [{ word: "fan", hint: "Noun: It moves air" },
             { word: "pet", hint: "Verb: stroke or pat (an animal) affectionately" },
             { word: "dig", hint: "Verb: break up and move earth with a tool or machine, or with hands, paws, snout, etc" },
             { word: "rob", hint: "Verb: to steal" },
             { word: "hope", hint: "Noun: grounds for believing that something good may happen" },
             { word: "wait", hint: "Verb: to remain ready for some reason or purpose" },
             { word: "gum", hint: "Noun: something to chew on until ready to spit out" },
             { word: "sled", hint: "Noun: something to ride on over snow or ice" },
             { word: "stick", hint: "Noun: a thin piece of wood that has fallen or been cut from a tree" },
             { word: "shine", hint: "Verb: give out a bright light" },
             { word: "dream", hint: "Noun: a series of thoughts, images, and sensations occurring in a person's mind during sleep" },
             { word: "blade", hint: "Noun: the flat cutting edge of a knife, saw, or other tool or weapon" },
             { word: "coach", hint: "Noun: a horse-drawn carriage, especially a closed one" },
             { word: "fright", hint: "Noun: an experience that causes someone to feel sudden intense fear" },
             { word: "chewed", hint: "Verb: (past tense) bite and work (food) in the mouth with the teeth, especially to make it easier to swallow" },
             { word: "crawl", hint: "Verb: move forward on the hands and knees or by dragging the body close to the ground" },
             { word: "wishes", hint: "Noun: desires or hopes for something to happen" },
             { word: "thorn", hint: "Noun: a stiff, sharp-pointed, straight or curved woody projection on the stem or other part of a plant" },
             { word: "shouted", hint: "Verb: say a loud call or cry, typically as an expression of a strong emotion" },
             { word: "spoil", hint: "Verb: diminish or destroy the value or quality of" },
             { word: "growl", hint: "Verb: make a low guttural sound in the throat" },
             { word: "third", hint: "Adjectove: constituting number three in a sequence; 3rd" },
             { word: "camped", hint: "Verb: live for a time in a camp, tent, or camper, as when on vacation" },
             { word: "tries", hint: "Verb: make an effort to do something" },
             { word: "clapping", hint: "Verb: strike the hands together repeatedly, typically in order to applaud" },
             { word: "riding", hint: "Verb: sit on and control the movement of something, typically as a recreation, commute or sport" },
             { word: "would", hint: "Verb: indicating the consequence of an imagined event or situation" },
             { word: "could", hint: "Verb: used to indicate possibility" },
             { word: "should", hint: "Verb: indicating a desirable or expected state" }];

// Creating an array of available letters
var alphabet = ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 
                'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Pp', 
                'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz'];

            
//LISTENERS
window.onload = startGame();

$(".letter").click(function(){
    checkLetter($(this).attr("id"));
    disableButton($(this));
})

$(".replayBtn").on("click", function() {
    location.reload();
});

$(".hintBtn").on("click", function() {
   $(this).hide();
   $("#hintMsg").append("<h4>Hint: " + selectedHint +"</h4>");
   remainingGuesses = remainingGuesses-1;
   updateMan();
   
   if(remainingGuesses<=0) {
       endGame(lose); 
   }
  
});

//FUNCTIONS
function startGame() {
    pickWord();
    initBoard();
    createLetters();
    updateBoard();
}

function pickWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}

//Creates the letters inside the letters div
function createLetters() {
    for (var letter of alphabet) {
        $("#letters").append("<button class='letter' id='" + letter + "'>" + letter + "</button>");
    }
}

function checkLetter(letter) {
    var positions = new Array();
    
    //Put all the positions the letter exists in the array
    for(var i = 0; i < selectedWord.length; i++) {
        //console.log(selectedWord)
        if(letter == selectedWord[i]) {
            positions.push(i);
        }
    }
    if(positions.length > 0) {
        updateWord(positions, letter);
        
        //Check to see if this is a winning guess
        if(!board.includes('_')) {
            endGame(true);
        }
    } else {
        remainingGuesses -= 1;
        updateMan();
    }
    
    if(remainingGuesses <=0) {
        endGame(false);
    }
}

//Update the current word then class for a board update
function updateWord(positions, letter) {
    for(var pos of positions) {
        board[pos] = letter;
    }
    updateBoard();
}


function updateBoard() {
    $("#word").empty();
    
    for (var i=0; i < board.length; i++) {
        $("#word").append(board[i] + " ");
    }
    
    $("#word").append("<br />");
    //$("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
}

function initBoard() {
    for (var letter in selectedWord) {
        board.push("_");
    }
}

//Calculates and updates the image for our stick man
function updateMan() {
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

//Ends the game by hiding game divs and displaying win or loss divs
function endGame(win) {
    $("#letters").hide();
    $("#hintBnt").hide();
    $("#hintMsg").hide();
    
    if(win) {
        $('#won').show();
    } else {
        $('#lost').show();
    }
}

//Disables the button and changes the style to tell the user its disabled
function disableButton(btn) {
    btn.prop("disabled", true);
    btn.attr("class", "btn btn-danger");
}
