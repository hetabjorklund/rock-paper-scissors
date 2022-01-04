import React, { useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Current() {

    // CURRENT GAME
    const [currentgame, setCurrentgame] = useState({
        'gameId': '',
        't': '',
        'playerA': {'name' : '', 'played' : ''},
        'playerB': {'name' : '', 'played' : ''}
    });

    // AGGRID
    const [rowdata, setRowdata] = useState([]); // row content for AgGrid
    let array = []; // AgGrid only accepts an array
    const columns = [
        { headerName: "Game ID", field: "gameId" },
        { headerName: "Timestamp", field: "t" },
        { headerName: "Player A", field: "playerA.name" },
        { headerName: "Player A played", field: "playerA.played" },
        { headerName: "Player B", field: "playerB.name" },
        { headerName: "Player B played", field: "playerB.played" }
    ]; // columns for AgGrid
        
    // WEBSOCKET

    // Create new Websocket
    const websocket = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live");

    // Websocket opens
    websocket.onopen = event => {
        //console.log("Websocket opened");
    };

    // Websocket receives a message from API
    websocket.onmessage = function (event) {

        let datajson = JSON.parse(JSON.parse(event.data)); // parsing only once results in a string, not object
        // console.log("Tässä datajson: " + datajson); // [Object object]
        // console.log("datajsonin tyyppi: " + typeof datajson); // object
 
        // set current game
        setCurrentgame({
                gameId: datajson.gameId,
                t: datajson.t,
                playerA: datajson.playerA,
                playerB: datajson.playerB
            });        

        //console.log("currentgame: " + JSON.stringify(currentgame)); // [Object object]
        //console.log("currentgame type: " + typeof currentgame); // object

        array.length = 0; // keep only one game in the array at a time
        array.push(currentgame); // add currentgame to array          
        setRowdata(array);

        //console.log("rowdata's type and content: " + typeof rowdata + "; " + JSON.stringify(rowdata)); // array contains one object
        
        // show the current game on the page
        if (datajson.t === undefined) { // games with undefined time are not finished
            document.getElementById("answer").innerHTML = "<p>" +
            "<b>GAME STARTED! </b> <br/>" +
            "<b>Game ID: </b>" + datajson.gameId + "<br/>" +
            "<b>Player A: </b>" + datajson.playerA.name + "<br/>" +
            "<b>Player B: </b>" + datajson.playerB.name + "<br/>" +
            "</p>";
        }        
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
        }        
        
    };

    // Websocket closes
    websocket.onclose = event => {
        //console.log("Websocket closed, code " + event.code);
    };

    // RETURN STATEMENT
    return (
        <div>
            <h1>Current games</h1>
            <div id="answer"></div>
            
            <div className="ag-theme-material" style={{ height: '700px', width: '70%', margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={rowdata}>
                </AgGridReact>        
            </div>

        </div>
    );

}

export default Current;