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
let score = 0;
let currentWord = ""
let word = ""
let pressedKeys = []
let currentMode = ""
let timeInterval = ""
let sec = 10000;
let scoreData = {}


function game_mode(mode) {
    //Mode bassed on what the user clicked
    if (mode === "easy") {
        let easy = ["Noob", "Value", "Dog", "Cat"];
        ran = Math.floor(Math.random() * easy.length);
        word = easy[ran];
        currentMode = "easy"
    
    }
    else if (mode === "medium") {
        let medium = ["Hangman", "Random", "Edited", "Course"];
        ran = Math.floor(Math.random() * medium.length);
        word = medium[ran];
        currentMode = "medium"
      
    }
    else {
        let hard = ["Difficult", "Avalanche", "Verbatim", "Paragraph"];
        ran = Math.floor(Math.random() * hard.length);
        word = hard[ran];
        currentMode = "hard"
      
    }

    //Hide Game Option and Show Game
    document.getElementById("login-form").style.display = "none";
    const prac = document.getElementById("game-rules").style.display = "flex";


}

function time() {   
    sec -= 1;
    if( sec === 0) {
        clearInterval(timeInterval);
        document.getElementById("overlay").style.display = "block";
        document.getElementById("losePopup").style.display = "block";
        document.getElementById("finalLose").innerHTML = `Final Score: ${score}`;
    } 
    document.getElementById("time").innerHTML = `Time: ${sec}`;
}

function next() {
    document.getElementById("center").style.display = "none";
    document.getElementById("center-1").style.display = "flex";

    const underscores = "_ ".repeat(word.length);
    document.getElementById("game-word").innerHTML = underscores;


    currentWord = underscores.split(" ");
    document.getElementById("game-sticks").innerHTML = gameSticks[0];

    timeInterval = setInterval(time, 1000);

}

document.addEventListener("DOMContentLoaded", () => {
    const gameButton = document.querySelectorAll(".key-button");

    document.addEventListener('keydown', function(event) {
        user_choice = event.key.toUpperCase();
        let keyButton = document.querySelector(`[data-key="${user_choice}"]`)
        keyButton.disabled = true;
        
        if (!pressedKeys.includes(user_choice)) {
            pressedKeys.push(user_choice);
        } else {
            return;
        }

        if (word.toUpperCase().includes(user_choice)) {
            for (let i = 0; i <word.length; i++) {
                if (word[i].toUpperCase() === user_choice) {
                    currentWord[i] = user_choice;
                    finalWord = currentWord.join(' ');
                    document.getElementById("game-word").innerHTML = finalWord
                    document.getElementById("score").innerHTML = `Score: ${score += 20}`;
                    correct += 1;
               
                }
            }
        checkWin(correct);
        } else {     
                wrong += 1;
                document.getElementById("game-sticks").innerHTML = gameSticks[wrong];
                document.getElementById("score").innerHTML = `Score: ${score -= 10}`;
                checkWin(wrong);
            }
    });

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
                        correct += 1

                    
                    }
                }
            checkWin(correct);
            }
            else {
                wrong += 1
                document.getElementById("game-sticks").innerHTML = gameSticks[wrong];
                checkWin(wrong);
            }
        })
        
    });


    
});

function checkWin(counter) {
    if (counter === correct && counter === word.length) {
        clearInterval(timeInterval);
        
        let bonus = sec * 10;
    
        document.getElementById("overlay").style.display = "block";
        document.getElementById("winPopup").style.display = "block";
        document.getElementById("score").innerHTML = `Score: ${score += 500 + bonus}`;
        document.getElementById("finalWin").innerHTML = `<h2>Final Score: ${score}</h2>`;
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
        fetch('/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userScore: score }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        
    } else if (counter === wrong && counter === 6) {
        clearInterval(timeInterval);
        document.getElementById("overlay").style.display = "block";
        document.getElementById("losePopup").style.display = "block";
        
        if (score <= 0) {
            document.getElementById("finalLose").innerHTML = "<h2>No Points. Yikes!</h2>";
        } else {
            document.getElementById("finalLose").innerHTML = `<h2>Final Score: ${score}</h2>`;
            fetch('score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userScore: score }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                }
    }

}

var current_page =  1;
var length = 1;

function next_page() {
    const prevButton = document.getElementById("previous_page")
    prevButton.disabled = false;
    container = document.getElementById("scoreContainer").innerHTML = "";
    if (current_page < length) {
        current_page++;
        displayScores();
    }

    if (current_page === length) {
        const nextButton = document.getElementById("next_page")
        nextButton.disabled = true;
    }
}

function previous_page() {
    container = document.getElementById("scoreContainer").innerHTML = "";
    const nextButton = document.getElementById("next_page")
    nextButton.disabled = false;

    if (current_page > 1) {
        current_page--;
        displayScores();
    }

    if (current_page === 1) {
        const prevButton = document.getElementById("previous_page")
        prevButton.disabled = true;
    }

}

function displayScores() {
    container = document.getElementById("scoreContainer").innerHTML = "";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("highscore").style.display = "block";
    document.getElementById("page_num").innerHTML = "";

    if (current_page === 1) {
        const prevButton = document.getElementById("previous_page")
        prevButton.disabled = true;
    } else {
        const prevButton = document.getElementById("previous_page")
        prevButton.disabled = false;
    }


    fetch('/scoreGet')
    .then(response => response.json())
    .then(data => {
        container = document.getElementById("scoreContainer");
        counter = (current_page - 1) * 10;
        page_count = current_page * 10;

        length = data.Score.length / 10;
        length = Math.ceil(length)

        const page_container = document.getElementById("page_num");
        
        for (let i = 1; i <= length; i++) {
            const page_element = document.createElement("button");
            page_element.className = "pageNum";
            page_element.innerHTML = i;
            page_container.appendChild(page_element);           
        }
    
        const test = document.querySelectorAll(".pageNum");
        
        test.forEach((item, index) => {
            item.addEventListener("click", () => {
                current_page = index + 1;
                displayScores();

                if (index + 1 === length) {
                    const nextButton = document.getElementById("next_page")
                    nextButton.disabled = true;
                } else {
                    const nextButton = document.getElementById("next_page")
                    nextButton.disabled = false;
                }
            });
        })

        while (counter < page_count) {
            const element = document.createElement("div");
            element.className = "highStyle";
            element.innerHTML = `
            <div>${counter + 1}.</div>
            <div>${data.Score[counter].score}</div>
            <div>${data.Score[counter].user}</div>
            `;
            container.appendChild(element);
            counter += 1;
        }

    });

}



function playAgain() {
    clearInterval(timeInterval);
    document.getElementById("center-1").style.display = "flex";  
    document.getElementById("overlay").style.display  = "none";
    document.getElementById("winPopup").style.display = "none";   
    document.getElementById("losePopup").style.display = "none";
    document.getElementById("score").innerHTML = `Score: ${score = 0}`;
    
    sec = 30;
    document.getElementById("time").innerHTML = `Time: ${sec}`;
    pressedKeys = []
    correct = 0;
    wrong = 0;
    container = "";
    currentWord = "";
    word = "";
    
    game_mode(currentMode)
    next()


    const gameButton = document.querySelectorAll(".key-button");

    gameButton.forEach(button => {
        button.disabled = false; 
    })
}


function menu() {
    console.log("working");
    clearInterval(timeInterval);
    document.getElementById("center").style.display = "flex";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("center-1").style.display = "none";
    document.getElementById("overlay").style.display  = "none";
    document.getElementById("winPopup").style.display = "none";   
    document.getElementById("losePopup").style.display = "none";
    document.getElementById("highscore").style.display = "none";
    document.getElementById("game-rules").style.display = "none";

    sec = 30;
    document.getElementById("time").innerHTML = `Time: ${sec}`;
    correct = 0;
    wrong = 0;
    currentWord = "";
    word = "";
    score = 0;
    document.getElementById("score").innerHTML = `Score: ${score = 0}`;
    pressedKeys = []

    const gameButton = document.querySelectorAll(".key-button");

    gameButton.forEach(button => {
        button.disabled = false; 
    })

}



