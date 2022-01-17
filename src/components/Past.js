import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import _ from "lodash";
import postmandata from '../assets/postmanresponse.json';
import { Button } from "@mui/material";

function Past() {

    // columns for the table
    const columns = [
        { headerName: "Player", field: "name", sortable: true, filter: true, resizable: true },
        { headerName: "Number of matches", field: "numberofmatches", sortable: true, filter: true, resizable: true },
        { headerName: "Matches played", field: "matchesplayed", sortable: true, filter: true, resizable: true },
        { headerName: "Win ratio", field: "winratio", sortable: true, filter: true, resizable: true },
        { headerName: "Most played hand", field: "mostplayedhand", sortable: true, filter: true, resizable: true }
    ];

    // array for all the data fetched
    const [histdata, setHistdata] = useState([]);

    // array for the row data
    let rowdata = [];
    // gridRef to select a row
    const gridRef = useRef();

    // fetch data from API
    /* This results in a CORS problem that I can't solve, the workaround is to fetch the data using Postman, copy that into a local .json file and use that as a source */
    /*const fetchData = () => {
        fetch('http://bad-api-assignment.reaktor.com/rps/history')        
        .then(response => response.json())
        .then(responseData => setHistdata(responseData.data))
        .catch(error => console.error(error));
    };*/

    // useEffect to set the histData
    useEffect(() => setHistdata(postmandata.data), []);

    //console.log("histdata json-stringified: " + JSON.stringify(histdata));
    //console.log("histdata size: " + histdata.length)

    // check win function
    function checkWin(wins, player, opponent) {
        if (player === opponent) {
            // tie, do nothing
        }
        else if (player === "SCISSORS") {
            if (opponent === "ROCK") {
                // opponent won, do nothing
            }
            else if (opponent === "PAPER") {
                wins++; // player won, increase wins
            }
        }
        else if (player === "ROCK") {
            if (opponent === "SCISSORS") {
                wins++; // player won, increase wins
            }
            else if (opponent === "PAPER") {
                // opponent won, do nothing
            }
        }
        else if (player === "PAPER") {
            if (opponent === "ROCK") {
                wins++; // player won, increase wins
            }
            else if (opponent === "SCISSORS") {
                // opponent won, do nothing
            }
        }
        return wins;
    }

    // divide games into groups based on player name
    const grouped = histdata.reduce((object, item) => {

        let ahand = item.playerA.played;
        let bhand = item.playerB.played;

        // check player A
        if (!object[item.playerA.name]) { // if the player doesn't exist yet            

            object[item.playerA.name] = { "games": [], "hands": [], "wins": 0 }; // create one with three values, games & hands are arrays and wins is an integer            
            object[item.playerA.name].games.push(item); // push the item itself into games
            object[item.playerA.name].hands.push(item.playerA.played); // push the played hand into hands

            // check win
            let playersWins = object[item.playerA.name].wins;
            object[item.playerA.name].wins = checkWin(playersWins, ahand, bhand);
        }
        else { // if the player exists, push into the existing one
            object[item.playerA.name].games.push(item); // push the item into games
            object[item.playerA.name].hands.push(item.playerA.played) // push the played hand into hands

            // check win
            let playersWins = object[item.playerA.name].wins;
            object[item.playerA.name].wins = checkWin(playersWins, ahand, bhand);
        }
        // console.log("player A: " + JSON.stringify(object[item.playerA.name]));

        // check player B
        if (!object[item.playerB.name]) { // if the player doesn't exist yet

            object[item.playerB.name] = { "games": [], "hands": [], "wins": 0 }; // create one with three values, games & hands are arrays and wins is an integer 
            object[item.playerB.name].games.push(item); // push the item itself into games
            object[item.playerB.name].hands.push(item.playerB.played); // push the played hand into hands

            // check win
            let playersWins = object[item.playerB.name].wins;
            object[item.playerB.name].wins = checkWin(playersWins, bhand, ahand);
        }
        else { // if the player exists, push into the existing one
            object[item.playerB.name].games.push(item); // push the item into games
            object[item.playerB.name].hands.push(item.playerB.played) // push the played hand into hands

            // check win
            let playersWins = object[item.playerB.name].wins;
            object[item.playerB.name].wins = checkWin(playersWins, bhand, ahand);
        }
        // console.log("player B: " + JSON.stringify(object[item.playerB.name]));
        return object;
    }, {});

    //console.log("grouped: " + JSON.stringify(grouped));

    // set the row data for the table
    for (const [key, value] of Object.entries(grouped)) {
        //console.log(`${key}: ${JSON.stringify(value)}`);

        // for each player, get the game id's
        let gameids = [];
        value.games.forEach(v => { gameids.push(v.gameId); });

        // for each player, get the most played hand
        let mostcommonhand = _.head(_(value.hands)
            .countBy()
            .entries()
            .maxBy(_.last));

        // count win ratio
        let ratio = value.wins / value.games.length;

        // push the data into the games array
        rowdata.push(
            {
                "name": key,
                "numberofmatches": value.games.length,
                "matchesplayed": gameids,
                "winratio": ratio.toFixed(2),
                "mostplayedhand": mostcommonhand
            }
        );
    }

    //console.log("games: " + JSON.stringify(rowdata));

    // look at the games of a specific player   
    const onButtonClick = event => {

        try {
            const selectedNode = gridRef.current.getSelectedNodes();
            const selectedData = selectedNode.map(node => node.data);
            const playerName = selectedData[0].name;
            const playerInfo = grouped[playerName];
            const playerGames = playerInfo.games;
            //console.log("playerGames: " + JSON.stringify(playerGames));
            let textToShow = playerName + "'s games:\n\n";
            for (let i = 0; i < playerGames.length; i++) {
                textToShow += "Game ID: " + playerGames[i].gameId + "\n";
                textToShow += "Timestamp: " + playerGames[i].t + "\n";
                textToShow += "Player A: " + playerGames[i].playerA.name + " (" + playerGames[i].playerA.played + ")\n";
                textToShow += "Player B: " + playerGames[i].playerB.name + " (" + playerGames[i].playerB.played + ")\n\n";
                //console.log(textToShow);
            }
            alert(`${textToShow}`);
        } catch (error) {
            //console.error(error);
            alert(`Select a player first!`);
        }

    }

    return (
        <div align="center">
            <h1>Past games</h1>

            <Button variant="contained" color="success" onClick={onButtonClick}>Show player's games</Button>

            <div className="ag-theme-material" style={{ height: '600px', width: '80%', margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={rowdata}
                    pagination={true}
                    paginationPageSize={10}
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection="single">
                </AgGridReact>
            </div>

        </div>
    );

}

export default Past;