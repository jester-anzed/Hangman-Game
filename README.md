# Hangman Game

### Video Demo:

## Project Overview:
This project is a full-featured, web-based Hangman game built with Python (Django), JavaScript, HTML, and CSS. It supports user authentication (register, login, logout), profile image uploads, multiple difficulty modes, a timed scoring system, and real-time gameplay with dynamic UI updates. The application includes backend API endpoints for submitting scores, retrieving global leaderboards, and displaying each user’s personal high scores, which are accessed by frontend through JavaScript fetch calls.


## Distinctiveness and Complexity
This project is distinct because it implements a fully interactive, dynamic game rather than a standard content or CRUD-style web app. The game consist of custom word banks, a timer, difficulty-based score multipliers, and detailed win/lose conditions. The Javascript supports both on-screen and physical keyboard input and handles UI transitions like popups, confetti, and resets. The backend provides JSON endpoints for score submission, leaderboard retrieval, and user-specific high scores, which update the UI automatically without reloading the page. It also includes user accounts, profile image uploads with live preview, saved scores, and a paginated global leaderboard, using Django authentication, file handling, database queries, and frontend logic. The result is a full-stack application which in my opinion is more complex than typical course projects.


## How to Run the Application
1. Clone or download the project repository.
2. Optionally create and activate a virtual environment.
3. Apply migrations with ```python manage.py migrate```.
4. Start the server using ```python manage.py runserver``` and open ```http://127.0.0.1:8000/``` in your browser.
5. Play the game
    * Register a new account or log in if you already have one.
    * Choose a difficulty mode (Easy, Medium, Hard).
    * The game will display a word to guess, track your score and wrong guesses, and update the hangman figure dynamically.
    * You can also view your personal high scores and the global leaderboard.
