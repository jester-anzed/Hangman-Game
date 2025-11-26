let gameSticks = [
 ` --------
 ¦      ¦
 O      ¦
-|-     ¦
/ \\     ¦
        ¦
      //_\\\\
      
❤❤❤❤❤❤
        `,
` --------
 ¦      ¦
 O      ¦
-|-     ¦
/       ¦
        ¦
      //_\\\\

❤❤❤❤❤
      `,
    
` --------
 ¦      ¦
 O      ¦
-|-     ¦
        ¦
        ¦
      //_\\\\

❤❤❤❤
      `,
` --------
 ¦      ¦
 O      ¦
-|      ¦
        ¦
        ¦
      //_\\\\

❤❤❤
      `,
` --------
 ¦      ¦
 O      ¦
 |      ¦
        ¦
        ¦
      //_\\\\

❤❤
      `,
` --------
 ¦      ¦
 O      ¦
        ¦
        ¦
        ¦
      //_\\\\

❤
      `,
` --------
 ¦      ¦
        ¦
        ¦
        ¦
        ¦
      //_\\\\

`,
]
let wrong = 0;
let correct = 0;
let currentWord = ""
let word = ""

function game_mode(mode) {
    //Mode bassed on what the user clicked
    if (mode === "easy") {
        let easy = ["Noob", "Value", "Dog", "Cat"];
        ran = Math.floor(Math.random() * easy.length);
        word = easy[ran];
    
    }
    else if (mode === "medium") {
        let medium = ["Hangman", "Random", "Edited", "Course"];
        ran = Math.floor(Math.random() * medium.length);
        word = medium[ran];
      
    }
    else {
        let hard = ["Difficult", "Avalanche", "Verbatim", "Paragraph"];
        ran = Math.floor(Math.random() * hard.length);
        word = hard[ran];
    }

    //Hide Game Option and Show Game
    document.getElementById("center").style.display = "none";
    document.getElementById("center-1").style.display = "flex";

    const underscores = "_ ".repeat(word.length);
    document.getElementById("game-word").innerHTML = underscores;


    currentWord = underscores.split(" ");
    document.getElementById("game-sticks").innerHTML = gameSticks[0];
}


document.addEventListener("DOMContentLoaded", () => {

    const gameButton = document.querySelectorAll(".key-button");

    gameButton.forEach(button => {
        button.addEventListener('click', (event) => {
            user_choice = event.target.textContent;
            button.disabled = true;
            if (word.toLowerCase().includes(user_choice.toLowerCase())) {
                for (let i = 0; i < word.length; i++ ) {
                    if (word[i].toLowerCase() === user_choice.toLowerCase()) {
                        currentWord[i] = user_choice;
                        finalWord = currentWord.join(' ');
                        document.getElementById("game-word").innerHTML = finalWord
                        correct += 1;
                    }
                }
            }
            else {
                wrong += 1
                console.log(wrong);
                document.getElementById("game-sticks").innerHTML = gameSticks[wrong];

                    if (wrong === 6) {
                    document.getElementById("overlay").style.display = "block";
                    document.getElementById("losePopup").style.display = "block";

                }
            }
        
            if (correct === word.length) {
                document.getElementById("overlay").style.display = "block";
                document.getElementById("winPopup").style.display = "flex";

                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                });
            } 

        });
    });
});


function playAgain() {
    document.getElementById("center-1").style.display = "flex";  
    document.getElementById("overlay").style.display  = "none";
    document.getElementById("winPopup").style.display = "none";   
    document.getElementById("losePopup").style.display = "none";
    correct = 0;
    wrong = 0;
    currentWord = "";
    word = "";

    const gameButton = document.querySelectorAll(".key-button");

    gameButton.forEach(button => {
        button.disabled = false; 
    })
}

function menu() {
    document.getElementById("center").style.display = "flex";
    document.getElementById("overlay").style.display  = "none";
     document.getElementById("winPopup").style.display = "none";   
     document.getElementById("losePopup").style.display = "none";

}

