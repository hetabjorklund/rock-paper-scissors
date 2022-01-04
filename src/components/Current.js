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

    let rowdata = [
        {
            "gameId": '5435435435',
            "t": 'testi',
            "playerA": {'name' : 'testia', 'played' : 'testikäsia'},
            "playerB": {'name' : 'testib', 'played' : 'testikäsib'}
        }
    ];

    const columns = [
        { headerName: "Game ID", field: "gameId" },
        { headerName: "Time", field: "t" },
        { headerName: "Player A", field: "playerA.name" },
        { headerName: "Player A played", field: "playerA.played" },
        { headerName: "Player B", field: "playerB.name" },
        { headerName: "Player B played", field: "playerB.played" }
    ];      
        
    const websocket = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live");

    websocket.onopen = event => {
        console.log("Websocket opened");
    };

    websocket.onmessage = function (event) {

        let datajson = JSON.parse(JSON.parse(event.data)); // only 1 JSON.parse results in a string, not object
        console.log("Tässä datajson: " + datajson); // [Object object]
        console.log("Tässä datajson toString: " + datajson.toString());
        console.log("datajsonin tyyppi: " + typeof datajson); // object

        console.log("datajson gameid: " + datajson.gameId);
        console.log("datajson time: " + datajson.t);
        console.log("datajson A: " + datajson.playerA.toString());
        console.log("datajson B: " + datajson.playerB.toString());

        //let uudelleenparsittudatajson = JSON.parse(datajson);
        //console.log("tässä uudelleenparsittu: " + uudelleenparsittudatajson);
        //console.log("tässä uudelleenparsitun tyyppi: " + typeof uudelleenparsittudatajson); // object

        //console.log("uudelleenparisttu gameid: " + uudelleenparsittudatajson.gameId);
        //console.log("uudelleenparisttu time: " + uudelleenparsittudatajson.t);

        //console.log("An tyyppi: " + typeof uudelleenparsittudatajson.playerA); // object
        //let parsittuA = JSON.parse(uudelleenparsittudatajson.playerA);
        //console.log("An parsittu tyyppi: " + typeof parsittuA);
        //console.log("uudelleenparisttu A nimi: " + parsittuA.name);        
 
        setCurrentgame(
            {
                gameId: datajson.gameId,
                t: datajson.t,
                playerA: datajson.playerA,
                playerB: datajson.playerB
            }
        );        

        rowdata.length = 0;
        //rowdata.push(datajson);
        rowdata.push(currentgame);

        console.log("tässä currentgame: " + JSON.stringify(currentgame));
        console.log("tässä currentgamen tyyppi: " + typeof currentgame);
        console.log("tässä data onmessagessa: " + JSON.stringify(rowdata));   
        
        if (datajson.t != undefined) {

            document.getElementById("answer").innerHTML = "<p>" +
            "<b>Game ID: </b>" + datajson.gameId + "<br/>" +
            "<b>Time: </b>" + datajson.t + "<br/>" + 
            "<b>Player A: </b>" + datajson.playerA.name + "<br/>" +
            "<b>A's hand: </b>" + datajson.playerA.played + "<br/>" +
            "<b>Player B: </b>" + datajson.playerB.name + "<br/>" +
            "<b>B's hand: </b>" + datajson.playerB.played + "<br/>" +
            "</p>";
        }
        if (datajson.t == undefined) {

            document.getElementById("answer").innerHTML = "<p>" +
            "<b>Game ID: </b>" + datajson.gameId + "<br/>" +
            "<b>Player A: </b>" + datajson.playerA.name + "<br/>" +
            "<b>Player B: </b>" + datajson.playerB.name + "<br/>" +
            "</p>";
        }
        
    };
        
    // Websocket closes
    websocket.onclose = event => {
        console.log("Websocket closed, code " + event.code);
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