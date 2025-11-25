let easy = ["Noob", "Value", "Dog", "Cat"]
let medium = ["Hangman", "Random", "Edited", "Course"]
let hard = ["Difficult", "Avalanche", "Verbatim", "Paragraph"]



function game_mode(mode) {
    //Mode bassed on what the user clicked
    let word = "";
    if (mode === "easy") {
        let easy = ["Noob", "Value", "Dog", "Cat"];
        ran = Math.floor(Math.random() * easy.length);
        word = easy[ran];
        console.log("Easy")
        console.log(word);
    }
    else if (mode === "medium") {
        let medium = ["Hangman", "Random", "Edited", "Course"];
        ran = Math.floor(Math.random() * medium.length);
        word = medium[ran];
        console.log("Medium")
        console.log(word);
    }
    else {
        let hard = ["Difficult", "Avalanche", "Verbatim", "Paragraph"];
        ran = Math.floor(Math.random() * hard.length);
        word = hard[ran];
        console.log("Hard");
    }

    //Hide Game Option and Show Game
    document.getElementById("center").style.display = "none";
    document.getElementById("center-1").style.display = "flex";

    //Change word to "_"
    const underscores = "_ ".repeat(word.length);
    document.getElementById("game-word").innerHTML = underscores;


    const gameButton = document.querySelectorAll(".key-button");

    let currentWord = underscores.split(" ");
    
    var correct = 0;

    gameButton.forEach(button => {
        button.addEventListener('click', (event) => {
            user_choice = event.target.textContent;
            button.disabled = true;
            console.log("right");
            if (word.toLowerCase().includes(user_choice.toLowerCase())) {
                for (let i = 0; i < word.length; i++ ) {
                    if (word[i].toLowerCase() === user_choice.toLowerCase()) {
                        currentWord[i] = user_choice;
                        finalWord = currentWord.join(' ');
                        document.getElementById("game-word").innerHTML = finalWord;
                        correct += 1;
                        console.log(correct);
                    }
                }
            console.log("Right"); 
            }
            else {
                console.log("wrong");

            }
            
    
            if (correct === word.length) {
                console.log("Winner!");
            }
    
        });

    });

   

}

