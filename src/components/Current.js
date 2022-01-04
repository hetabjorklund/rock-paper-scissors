import React, { useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Current() {

    let [currentgame, setCurrentgame] = useState({
        'gameId': '',
        't': '',
        'playerA': {'name' : '', 'played' : ''},
        'playerB': {'name' : '', 'played' : ''}
    });

    const [rowdata, setRowdata] = useState([]);
    let array = []; // AgGrid only accepts an array

    const columns = [
        { headerName: "Game ID", field: "gameId" },
        { headerName: "Time", field: "t" },
        { headerName: "Player A", field: "playerA.name" },
        { headerName: "Player A played", field: "playerA.played" },
        { headerName: "Player B", field: "playerB.name" },
        { headerName: "Player B played", field: "playerB.played" }
    ];      
        
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

        console.log("datajson gameid: " + datajson.gameId);
        console.log("datajson time: " + datajson.t); 
        console.log("datajson time type: " + typeof datajson.t); // number
        console.log("datajson A: " + datajson.playerA.toString());
        console.log("datajson B: " + datajson.playerB.toString());     
 
        setCurrentgame({
                gameId: datajson.gameId,
                t: datajson.t,
                playerA: datajson.playerA,
                playerB: datajson.playerB
            });        

        console.log("tässä currentgame: " + JSON.stringify(currentgame));
        console.log("tässä currentgamen tyyppi: " + typeof currentgame); // object

        array.length = 0; // keep only one game in the array at a time
        array.push(currentgame); // add current game to array        
        
        //setRowdata(currentgame);   
        setRowdata(array);
        console.log("rowdata's type and content, onmessage: " +
            typeof rowdata + "; " +
            JSON.stringify(rowdata)); // array contains one object  
        
        if (datajson.t === undefined) {
            document.getElementById("answer").innerHTML = "<p>" +
            "<b>GAME STARTED! </b> <br/>" +
            "<b>Game ID: </b>" + datajson.gameId + "<br/>" +
            "<b>Player A: </b>" + datajson.playerA.name + "<br/>" +
            "<b>Player B: </b>" + datajson.playerB.name + "<br/>" +
            "</p>";
        }        
        if (datajson.t !== undefined) {
            document.getElementById("answer").innerHTML = "<p>" +
            "<b>GAME FINISHED! </b> <br/>" +
            "<b>Game ID: </b>" + datajson.gameId + "<br/>" +
            "<b>Time: </b>" + datajson.t + "<br/>" + 
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

    // Return statement
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