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
        console.log(word);
    }

    //Hide Game Option and Show Game
    document.getElementById("center").style.display = "none";
    document.getElementById("center-1").style.display = "flex";

    //Change word to "_"
    const underscores = "_ ".repeat(word.length);
    document.getElementById("game-word").innerHTML = underscores;


    

}

