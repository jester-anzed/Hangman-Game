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
let sec = 60;
let scoreData = {}
let gameOver = false;

function game_mode(mode) {
    currentMode = mode;
    //Mode bassed on what the user clicked
    if (currentMode === "easy") {
        let easy = ["Noob", "Value", "Dog", "Cat"];
        ran = Math.floor(Math.random() * easy.length);
        word = easy[ran];
    }
    else if (currentMode === "medium") {
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
    document.getElementById("login-form").style.display = "none";
    document.getElementById("mode").innerHTML = `MODE: ${currentMode.toUpperCase()}`;
    const prac = document.getElementById("game-rules").style.display = "flex";
    
    currentMode = currentMode.toUpperCase();
    console.log(currentMode);

}


function time() {   
    sec -= 1;
    if( sec === 0) {
        clearInterval(timeInterval);
        document.getElementById("overlay").style.display = "block";
        document.getElementById("losePopup").style.display = "block";

        if (score > 0) {
            document.getElementById("finalLose").innerHTML = `<h2>Final Score: ${score}</h2>`;
            document.getElementById("finalLose").innerHTML = "<h2>No Points. Yikes!</h2>";
        } else { 

        }
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
    gameButton = document.querySelectorAll(".key-button");
    
    document.addEventListener('keydown', function(event) {

        if (!gameOver) {
            user_choice = event.key.toUpperCase();
            let keyButton = document.querySelector(`[data-key="${user_choice}"]`)
            keyButton.disabled = true;
            let points = 1
            
            if (currentMode === "hard") {
                points = 3
            } else if (currentMode === "medium") {
                points = 2
            }
            
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
                        document.getElementById("score").innerHTML = `Score: ${score += (20 * points)}`;
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
        };
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
                checkWin(wrong);
                document.getElementById("game-sticks").innerHTML = gameSticks[wrong];
            }
        })
        
    });
});




function profile() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("user-profile").style.display = "block";

    let profilePic = document.getElementById("profile-pic");
    let inputFile = document.getElementById("input-file");


    inputFile.onchange = function() {
        profilePic.src = URL.createObjectURL(inputFile.files[0]);
    }
}


function checkWin(counter) {
    if (counter === correct && counter === word.length) {
        clearInterval(timeInterval);
        
        gameOver = true;

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
            body: JSON.stringify({ userScore: score, userMode: currentMode}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        
    } else if (counter === wrong && counter === 6) {
        clearInterval(timeInterval);
        document.getElementById("overlay").style.display = "block";
        document.getElementById("losePopup").style.display = "block";

       gameOver = true;

        if (score <= 0) {
            document.getElementById("finalLose").innerHTML = "<h2>No Points. Yikes!</h2>";
            document.getElementById("cor-word").innerHTML = `<h2>Word: ${word}</h2>`;
        } else {
            document.getElementById("finalLose").innerHTML = `<h2>Final Score: ${score}</h2>`;
            document.getElementById("cor-word").innerHTML = `<h2>Word: ${word}</h2>`;
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

    if (current_page >= 1) {
        const prevButton = document.getElementById("previous_page")
        prevButton.disabled = true;
        const nextButton = document.getElementById("next_page");
        nextButton.disabled = true;
    } else {
        const prevButton = document.getElementById("previous_page")
        prevButton.disabled = false;
        const nextButton = document.getElementById("next_page");
        nextButton.disabled = false;
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
            if(index + 1 === current_page){
                item.classList.add('active');
            }
            item.addEventListener('click', () => {
                current_page = index + 1;
                displayScores();
            });
        });

        while (counter < page_count) {
            const element = document.createElement("div");
            element.className = "highStyle";
            element.innerHTML = `
            <div>${counter + 1}.</div>
            <div>${data.Score[counter].score} - ${data.Score[counter].mode.toUpperCase()}</div>
            <div>
                <div>${data.Score[counter].user}</div>
                <img src="${data.Score[counter].img}" alt="Profile-Pic">
            </div>
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
    
    sec = 60;
    document.getElementById("time").innerHTML = `Time: ${sec}`;
    pressedKeys = []
    correct = 0;
    wrong = 0;
    container = "";
    currentWord = "";
    word = "";
    gameOver = false;
    
    game_mode(currentMode);
    next()


    const gameButton = document.querySelectorAll(".key-button");

    gameButton.forEach(button => {
        button.disabled = false; 
    })
}


function menu() {
    clearInterval(timeInterval);
    document.getElementById("center").style.display = "flex";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("center-1").style.display = "none";
    document.getElementById("user-profile").style.display = "none";
    document.getElementById("overlay").style.display  = "none";
    document.getElementById("winPopup").style.display = "none";   
    document.getElementById("losePopup").style.display = "none";
    document.getElementById("highscore").style.display = "none";
    document.getElementById("game-rules").style.display = "none";

    sec = 60;
    document.getElementById("time").innerHTML = `Time: ${sec}`;
    correct = 0;
    wrong = 0;
    currentWord = "";
    word = "";
    gameOver = false;
    score = 0;
    document.getElementById("score").innerHTML = `Score: ${score = 0}`;
    pressedKeys = []

    const gameButton = document.querySelectorAll(".key-button");

    console.log(gameButton);
    gameButton.forEach(button => {
        button.disabled = false; 
    })

}



