# Rock, paper, scissors!

This React app displays the results of "rock, paper, scissors" matches from two APIs. Historical results are fetched from https://bad-api-assignment.reaktor.com/rps/history and ongoing games from a WebSocket API at https://bad-api-assignment.reaktor.com/rps/live.

The app runs in [Heroku](https://rockpaperscissors-2022.herokuapp.com) and the source code is available in [GitHub](https://github.com/hetabjorklund/rock-paper-scissors).

## Current games

Ongoing games are displayed at the top of the page as they start and end with the game id, timestamp, players, and their hands. This is done with a basic "document.getElementById" & "div id" combination.

## Historical games

On the bottom of the page, historical results are displayed in a table by the name of the player. You can see the number of matches they have played, the game id's of the matches they have played, their win ratio, and their most played hand. I used AgGrid to display the results.

## Known issues

When fetching the historical data from the API at https://bad-api-assignment.reaktor.com/rps/history, I encountered a CORS problem that I was not able to solve. The application was not able to complete the request through the browser, but a GET request through Postman presented no problems. Therefore, as a workaround, I copied the json data that the API returned through Postman and used that as a local json file.

## Creator
Heta Björklund
 * Github: https://github.com/hetabjorklund
 * LinkedIn: https://www.linkedin.com/in/heta-bjorklund
