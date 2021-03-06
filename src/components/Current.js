import * as React from 'react';
import { registerLocale } from "react-datepicker";
import fi from 'date-fns/locale/fi';
registerLocale('fi', fi);

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
            document.getElementById("started").innerHTML = "<p>" +
            "<b>GAME STARTED: </b> <br/>" +
            "<b>Game ID: </b>" + datajson.gameId + "<br/>" +
            "<b>Player A: </b>" + datajson.playerA.name + "<br/>" +
            "<b>Player B: </b>" + datajson.playerB.name + "<br/>" +
            "</p>";
    };
        if (datajson.t !== undefined) { // games with a timestamp are finished
            document.getElementById("finished").innerHTML = "<p>" +
            "<b>GAME FINISHED: </b> <br/>" +
            "<b>Game ID: </b>" + datajson.gameId + "<br/>" +
                "<b>Date and time: </b>" + new Date(datajson.t).toLocaleDateString('fi-FI')
                + ", " + new Date(datajson.t).toLocaleTimeString('fi-FI')
                + "<br/>" +
            "<b>Player A: </b>" + datajson.playerA.name + " (" + datajson.playerA.played + ") <br/>" +
            "<b>Player B: </b>" + datajson.playerB.name + " (" + datajson.playerB.played + ") <br/>" +
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
            <div id="started"></div>
            <div id="finished"></div>
        </div>
    );

}

export default Current;