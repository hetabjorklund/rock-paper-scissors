import * as React from 'react';

function Current() {
      
    // Create new Websocket
    const websocket = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live");

    // Websocket opens
    websocket.onopen = event => {
        //console.log("Websocket opened");
    };

    // Websocket receives a message from API
    websocket.onmessage = function (event) {

        let datajson = JSON.parse(JSON.parse(event.data)); // parsing only once results in a string, not object
        
        // show the current game on the page
        if (datajson.t === undefined) { // games with undefined time are not finished
            document.getElementById("answer").innerHTML = "<p>" +
            "<b>GAME STARTED! </b> <br/>" +
            "<b>Game ID: </b>" + datajson.gameId + "<br/>" +
            "<b>Player A: </b>" + datajson.playerA.name + "<br/>" +
            "<b>Player B: </b>" + datajson.playerB.name + "<br/>" +
            "</p>";
        };        
        if (datajson.t !== undefined) { // games with timestamp are finished
            document.getElementById("answer").innerHTML = "<p>" +
            "<b>GAME FINISHED! </b> <br/>" +
            "<b>Game ID: </b>" + datajson.gameId + "<br/>" +
            "<b>Timestamp: </b>" + datajson.t + "<br/>" + 
            "<b>Player A: </b>" + datajson.playerA.name + "<br/>" +
            "<b>A's hand: </b>" + datajson.playerA.played + "<br/>" +
            "<b>Player B: </b>" + datajson.playerB.name + "<br/>" +
            "<b>B's hand: </b>" + datajson.playerB.played + "<br/>" +
            "</p>";
        };  
        
    };    
    
    // Websocket closes
    websocket.onclose = event => {
        //console.log("Websocket closed, code " + event.code);
    };

    // RETURN STATEMENT
    return (
        <div align="center">
            <h1>Current games</h1>
            <div id="answer"></div>
        </div>
    );

}

export default Current;