import React, { useState, useEffect } from "react";
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

    //let [currentgame, setCurrentgame] = useState([]);

//    let data = [];

    let data = [
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
    

    //useEffect(() => {
        
        const websocket = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live");

        websocket.onopen = event => {
            console.log("websocket avattu!");
        };

        websocket.onmessage = function (event) {
            //console.log("tässä jsonstringify: " + JSON.stringify(event.data));
            console.log("tässä event.data: " + event.data);
            console.log("tässä JSONparse" + JSON.parse(event.data));

            const datajson = JSON.parse(event.data);
            console.log("Tässä datajson: " + datajson);

          //  setCurrentgame(JSON.parse(event.data));
//            setCurrentgame(event.data);

            setCurrentgame(
                {
                    gameId: datajson.gameId,
                    t: datajson.t,
                    playerA: datajson.playerA,
                    playerB: datajson.playerB
                }
            );

            //data.push(currentgame);
            data.length = 0;
            data.push(datajson);

            //console.log("tässä currentgame: " + JSON.stringify(currentgame));

            console.log("tässä data: " + JSON.stringify(data));
            
            /*tässä JSONparse{"type":"GAME_RESULT",
            "gameId":"45516eae8775e35b1c54384d",
            "t":1641208327087,
            "playerA":{"name":"Aino Koskinen","played":"PAPER"},
            "playerB":{"name":"Marjatta Virtanen","played":"ROCK"}}*/
        };
        
        websocket.onclose = event => {
            console.log("websocket suljettu!");
            console.log("koodi: " + event.code);
        };

//    }, []);

    const showGame = () => {
        return (
            <p>  data.toString();      
            </p>
        );
    }
    
    return (
        <div>
            <h1>Current games here</h1>
            <p> <showGame /> </p>
            <div className="ag-theme-material" style={{ height: '700px', width: '70%', margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={data}>
                </AgGridReact>        
            </div>


        </div>
    );

}

export default Current;