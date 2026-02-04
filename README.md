# Hangman Game

### Video Demo: https://www.youtube.com/watch?v=zEBoRwEx0Ks

## Project Overview:
This project is a full-featured, web-based Hangman game built using Django (Python) for the backend and JavaScript, HTML, and CSS for the frontend. The application supports user authentication (registration, login, logout), profile image uploads, multiple difficulty modes, a timed scoring system, and real-time gameplay with UI updates. The game interacts with the backend through custom JSON API endpoints, enabling asynchronous score submissions and real-time leaderboard updates without requiring a page reload. Users can view both their personal high scores and a global leaderboard.


## Distinctiveness and Complexity
This project differs fundamentally from all prior CS50W projects and cannot reasonably be implemented as an extension of any of them.

* Wiki is a content-driven application focused on creating and editing encyclopedia pages using form submissions. In contrast, this project is an interactive real-time game with continuous state updates handled by JavaScript.

* Commerce centers around listings, bidding, and transactions. This project has no marketplace or CRUD-based item management and instead focuses on gameplay mechanics, scoring logic, and timing.

* Network is a social media platform involving posts, follows, and likes. This project does not involve social networking features and instead emphasizes game logic, score tracking, and leaderboard systems.

Unlike earlier projects that relied heavily on Django templates and page reloads, this application uses JavaScript fetch requests and custom Django JSON endpoints to update the game state. The emphasis on real-time interaction, scoring logic, and frontend–backend coordination differentiate this project in both purpose and implementation.



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
