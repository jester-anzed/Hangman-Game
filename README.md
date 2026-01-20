# Hangman Game

### Video Demo:

## Project Overview:
This project is a full-featured, web-based Hangman game built with Python (Django), JavaScript, HTML, and CSS. It supports user authentication (register, login, logout), profile image uploads, multiple difficulty modes, a timed scoring system, and real-time gameplay with dynamic UI updates. The application includes backend API endpoints for submitting scores, retrieving global leaderboards, and displaying each user’s personal high scores, which are accessed by frontend through JavaScript fetch calls.


## Distinctiveness and Complexity
This project is distinct because it implements a fully interactive, dynamic game rather than a standard content or CRUD-style web app. Unlike many earlier course projects that relied heavily on form submissions and page reloads (such as Wiki), I chose to use JavaScript with fetch and custom Django JSON endpoints so the game could update in real time. I used Django for the backend because its built-in authentication and security features which helped with score tracking, profile image uploads, etc. I structured most of the game logic on the frontend to keep gameplay responsive, while keeping validation and data the backend(Django). I also designed separate models for users and scores to support queries for personal high scores and overall leaderboard. These choices reflect how this project is diifferent from previous projects. I'm proud of how it turned out even though the code structure could be better and not repetitive specially CSS part. 



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


## What I Learned
Building this project helped me better understand full-stack web development and how different technologies work together. I became more confident using Django beyond basic models and templates, especially with authentication, profile image uploads, and organizing models for features like scores and leaderboards. I also learned how to create and use backend endpoints with JSON and JavaScript fetch. The project helped me understand how data moves between the frontend and backend, including validating requests, handling CSRF tokens, and making sure actions like submitting scores happen at the right time.

Overall, this project taught me how to plan, build, and refine a complete application from start to finish. It pushed me to write clearer code (though I still need to work on making it cleaner and less repetitive), organize features more effectively, and understand the reasoning behind technical decisions. It also showed me how much more there is to learn, motivating me to continue growing as a developer.


## Additional Information
Future Improvements:
* Adding support for importing different word lists from external .txt files for each difficulty level.
* Implementing additional difficulty modes or categories.
* Enhancing animations and UI effects for better visual feedback.
* Adding sound effects for correct or incorrect guesses.
* Expanding the leaderboard with more detailed statistics or filtering options.
* Improving mobile responsiveness with advanced CSS or frameworks.
* Allowing users to customize their profile and personal game settings.

Thanks for checking out this project! Happy coding!