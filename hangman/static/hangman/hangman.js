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

let easy = [
    {"category": "Animal", "name": "Lion"},
    {"category": "Fruit", "name": "Apple"},
    {"category": "Color", "name": "Blue"},
    {"category": "Vehicle", "name": "Car"},
    {"category": "Country", "name": "Canada"},
    {"category": "Emotion", "name": "Happiness"},
    {"category": "Profession", "name": "Doctor"},
    {"category": "Sport", "name": "Football"},
    {"category": "Technology", "name": "Computer"},
    {"category": "Nature", "name": "Mountain"}
]

let medium = [
    {"category": "Breeds of Dog", "name": "Beagle"},
    {"category": "Vegetables", "name": "Spinach"},
    {"category": "Things in Kitchen", "name": "Teaspoon"},
    {"category": "Body Part", "name": "Forehead"},
    {"category": "Movie", "name": "Gladiator"},
    {"category": "Cartoon Character", "name": "Mickey M."},
    {"category": "Fast Food", "name": "Hotdogss"},
    {"category": "Desserts", "name": "Cupcakes"},
    {"category": "Book", "name": "Dracula"},
    {"category": "Gym Equipment", "name": "Dumbbell"}
]


let hard  = [
    {"category": "Sports", "name": "Basketball"},
    {"category": "Fruit", "name": "Pineapples"},
    {"category": "Game", "name": "Crosswords"},
    {"category": "Food", "name": "Lasagnette"},
    {"category": "City", "name": "Amsterdam"},
    {"category": "Device", "name": "Smartphone"},
    {"category": "Drink", "name": "Smoothiest"},
    {"category": "Country", "name": "Argentina"},
    {"category": "Tree", "name": "Chestnuts"},
    {"category": "Clothes", "name": "Sweatshirt"}
]

let wrong = 0;
let correct = 0;
let score = 0;
let currentWord = ""
let word = ""
let category = ""
let pressedKeys = []
let currentMode = ""
let timeInterval = ""
let sec = 60;
let scoreData = {}
let gameOver = false;

function game_mode(mode) {
    currentMode = mode;
    currentMode = currentMode.toUpperCase();
    //Mode bassed on what the user clicked
    if (currentMode === "EASY") {
        ran = Math.floor(Math.random() * easy.length);
        rand_word = easy[ran]
        word = rand_word.name
        category = rand_word.category
    }
    else if (currentMode === "MEDIUM") {
        ran = Math.floor(Math.random() * medium.length);
        rand_word = medium[ran]
        word = rand_word.name
        category = rand_word.category
      
    }
    else {
        ran = Math.floor(Math.random() * hard.length);
        rand_word = hard[ran]
        word = rand_word.name
        category = rand_word.category
    }

    //Hide Game Option and Show Game
    document.getElementById("login-form").style.display = "none";
    document.getElementById("mode").innerHTML = `MODE: ${currentMode.toUpperCase()}`;
    const prac = document.getElementById("game-rules").style.display = "flex";
    document.getElementById("category").innerHTML = category;
    
    currentMode = currentMode.toUpperCase();
    console.log(word);
    console.log(category);
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
            
            if (currentMode === "HARD") {
                points = 3
            } else if (currentMode === "MEDIUM") {
                points = 2
            }
            
            console.log(points);
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

    
    fetch('/highScore')
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        console.log(data.hard)
        console.log(data.med);

        document.getElementById("prof-easy").innerHTML = `Easy: ${data.easy}`;
        document.getElementById("prof-medium").innerHTML = `Medium: ${data.med}`;
        document.getElementById("prof-hard").innerHTML = `Hard:  ${data.hard}`;
    
    });
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
    container = document.getElementById("scoreContainer").innerHTML = "";

    const prevButton = document.getElementById("previous_page");
    const nextButton = document.getElementById("next_page");

    prevButton.disabled = false
    
    if (current_page < length) {
        current_page ++;
        displayScores();
    }

    if (current_page === length) {
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
    const nextButton = document.getElementById("next_page")
    const prevButton = document.getElementById("previous_page")

    fetch('/scoreGet')
    .then(response => response.json())
    .then(data => {
        container = document.getElementById("scoreContainer");
        counter = (current_page - 1) * 10;
        page_count = current_page * 10;

        length = data.Score.length / 10;
        length = Math.ceil(length)

        console.log(current_page);
    
        if (current_page === 1) {
            prevButton.disabled = true;
            console.log("working");
        } else {
            prevButton.disabled = false;
        }

        if(length === 1 ) {
            nextButton.disabled = true;
            prevButton.disabled = true;
        }


        if (current_page === length) {
            nextButton.disabled = true;

        }

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
            <div style="display: flex; padding: 10px;">${data.Score[counter].score} - ${data.Score[counter].mode.toUpperCase()}</div>
            <div class="profile-tab">
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
    category = "";
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



