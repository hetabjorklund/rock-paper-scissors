import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import _ from "lodash";
import postmandata from '../assets/postmanresponse.json';
import testdata from '../assets/testdata.json';

function Past() {

    // columns for the table
    const columns = [
        { headerName: "Player", field: "name", sortable: true, filter: true, resizable:true },
        { headerName: "Number of matches", field: "numberofmatches", sortable: true, filter: true, resizable:true },
        { headerName: "Matches played", field: "matchesplayed", sortable: true, filter: true, resizable:true },
        { headerName: "Win ratio", field: "winratio", sortable: true, filter: true, resizable:true },        
        { headerName: "Most played hand", field: "mostplayedhand", sortable: true, filter: true, resizable:true }
    ];

    // array for all the data fetched
    const [histdata, setHistdata] = useState([]);

    // array for the row data
    let rowdata = [];

    //const content = postmandata.data;
    //const content = testdata.data;
    //console.log("content: " + content);
    //console.log("type of content: " + typeof content);

    // fetch all data from API
    /* This results in a CORS problem that I can't solve, the workaround is to fetch the data using Postman, copy that into a local .json file and use that as a source */
    /*const fetchData = () => {
        fetch('http://bad-api-assignment.reaktor.com/rps/history')        
        .then(response => response.json())
        .then(responseData => setHistdata(responseData.data))
        .catch(error => console.error(error));
    };*/

    // useEffect to set the histData
    //useEffect(() => setHistdata(postmandata.data), []);
    useEffect(() => setHistdata(testdata.data), []);
    
    //console.log("histdata: " + histdata);
    //console.log("histdata json-stringified: " + JSON.stringify(histdata));
    //console.log("histdata size: " + histdata.length)

    // check win A function
    function checkWinA(playerswins, ahand, bhand) {
        console.log("A checkwinissa!")

        if (ahand === bhand) {
            // tie, do nothing
            console.log("funktiossa tie, do nothing");
        }
        else if (ahand === "SCISSORS") {
            if (bhand === "ROCK") {
                // b won, do nothing
                console.log("funktiossa b won, do nothing");
            }
            else if (bhand === "PAPER") {
                playerswins++; // a won, increase wins
                console.log("funktiossa a won");
            }
        }
        else if (ahand === "ROCK") {
            if (bhand === "SCISSORS") {
                playerswins++; // a won, increase wins
                console.log("funktiossa a won");
            }
            else if (bhand === "PAPER") {
                // b won, do nothing
                console.log("funktiossa b won, do nothing");
            }
        }
        else if (ahand === "PAPER") {
            if (bhand === "ROCK") {
                playerswins++; // a won, increase wins
                console.log("funktiossa a won");
            }
            else if (bhand === "SCISSORS") {
                // b won, do nothing
                console.log("funktiossa b won, do nothing");
            }
        }
        return playerswins;
    }

    function checkWinB(playerswins, ahand, bhand) {
        console.log("B checkwinissa!")

        if (ahand === bhand) {
            // tie, do nothing
            console.log("b-check, tie, do nothing");
        }
        else if (ahand === "SCISSORS") {
            if (bhand === "ROCK") {
                playerswins++; // b won, increase wins
                console.log("b-check, b won");
            }
            else if (bhand === "PAPER") {
                // a won, do nothing
                console.log("b-check, a won, do nothing");
            }
        }
        else if (ahand === "ROCK") {
            if (bhand === "SCISSORS") {
                // a won, do nothing
                console.log("b-check, a won, do nothing");
            }
            else if (bhand === "PAPER") {
                playerswins++; // b won, increase wins
                console.log("b-check, b won");
            }
        }
        else if (ahand === "PAPER") {
            if (bhand === "ROCK") {
                // a won, do nothing
                console.log("b-check, a won, do nothing");
            }
            else if (bhand === "SCISSORS") {
                playerswins++; // b won, increase wins
                console.log("b-check, b won");
            }
        }
        return playerswins;
    }

    // divide games into groups based on player name
    const grouped = histdata.reduce((object, item) => {

        let ahand = item.playerA.played;
        let bhand = item.playerB.played;
        
        // check player A
        if (!object[item.playerA.name]) { // if the player doesn't exist yet            

            //console.log("object: " + JSON.stringify(object));
            //console.log("item: " + JSON.stringify(item));

            object[item.playerA.name] = { "games": [], "hands": [], "wins": 0 }; // create one with three values, games & hands are arrays and wins is an integer            
            object[item.playerA.name].games.push(item); // push the item itself into games
            object[item.playerA.name].hands.push(item.playerA.played); // push the played hand into hands

            // check win

            let playerswins = object[item.playerA.name].wins;
            object[item.playerA.name].wins = checkWinA(playerswins, ahand, bhand);      

            /*if (ahand === bhand) {
                // tie, do nothing
                console.log("tie, do nothing");
            }
            else if (ahand === "SCISSORS") {
                if (bhand === "ROCK") {
                    // b won, do nothing
                    console.log("b won, do nothing");
                }
                else if (bhand === "PAPER") {
                    object[item.playerA.name].wins++; // a won, increase wins
                    console.log("a won");
                }
            }
            else if (ahand === "ROCK") {
                if (bhand === "SCISSORS") {
                    object[item.playerA.name].wins++; // a won, increase wins
                    console.log("a won");
                }
                else if (bhand === "PAPER") {
                    // b won, do nothing
                    console.log("b won, do nothing");
                }
            }
            else if (ahand === "PAPER") {
                if (bhand === "ROCK") {
                    object[item.playerA.name].wins++; // a won, increase wins
                    console.log("a won");
                }
                else if (bhand === "SCISSORS") {
                    // b won, do nothing
                    console.log("b won, do nothing");
                }
            }  */         
        }        
        else { // if the player exists, push into the existing one
            object[item.playerA.name].games.push(item); // push the item into games
            object[item.playerA.name].hands.push(item.playerA.played) // push the played hand into hands

            // check win
            let playerswins = object[item.playerA.name].wins;
            object[item.playerA.name].wins = checkWinA(playerswins, ahand, bhand);

            /*if (ahand === bhand) {
                // tie, do nothing
                console.log("normi tie, do nothing");
            }
            else if (ahand === "SCISSORS") {
                if (bhand === "ROCK") {
                    // b won, do nothing
                    console.log("normi b won, do nothing");
                }
                else if (bhand === "PAPER") {
                    object[item.playerA.name].wins++; // a won, increase wins
                    console.log("normi a won");
                }
            }
            else if (ahand === "ROCK") {
                if (bhand === "SCISSORS") {
                    object[item.playerA.name].wins++; // a won, increase wins
                    console.log("normi a won");
                }
                else if (bhand === "PAPER") {
                    // b won, do nothing
                    console.log("normi b won, do nothing");
                }
            }
            else if (ahand === "PAPER") {
                if (bhand === "ROCK") {
                    object[item.playerA.name].wins++; // a won, increase wins
                    console.log("normi a won");
                }
                else if (bhand === "SCISSORS") {
                    // b won, do nothing
                    console.log("normi b won, do nothing");
                }
            }*/
        }

        console.log("object.item.playerA.name: " + JSON.stringify(object[item.playerA.name]));

        // check player B
        if (!object[item.playerB.name]) { // if the player doesn't exist yet
            object[item.playerB.name] = { "games": [], "hands": [], "wins": 0 }; // create one with three values, games & hands are arrays and wins is an integer 
            object[item.playerB.name].games.push(item); // push the item itself into games
            object[item.playerB.name].hands.push(item.playerB.played); // push the played hand into hands
            
            // check win
            let playerswins = object[item.playerB.name].wins;
            object[item.playerB.name].wins = checkWinB(playerswins, ahand, bhand);

            /*if (ahand === bhand) {
                // tie, do nothing
                console.log("b-check, tie, do nothing");
            }
            else if (ahand === "SCISSORS") {
                if (bhand === "ROCK") {
                    object[item.playerB.name].wins++; // b won, increase wins
                    console.log("b-check, b won");
                }
                else if (bhand === "PAPER") {
                    // a won, do nothing
                    console.log("b-check, a won, do nothing");
                }
            }
            else if (ahand === "ROCK") {
                if (bhand === "SCISSORS") {
                    // a won, do nothing
                    console.log("b-check, a won, do nothing");
                }
                else if (bhand === "PAPER") {
                    object[item.playerB.name].wins++; // b won, increase wins
                    console.log("b-check, b won");
                }
            }
            else if (ahand === "PAPER") {
                if (bhand === "ROCK") {
                    // a won, do nothing
                    console.log("b-check, a won, do nothing");
                }
                else if (bhand === "SCISSORS") {
                    object[item.playerB.name].wins++; // b won, increase wins
                    console.log("b-check, b won");
                }
            }*/            
        }
        else { // if the player exists, push into the existing one
            object[item.playerB.name].games.push(item); // push the item into games
            object[item.playerB.name].hands.push(item.playerB.played) // push the played hand into hands

            // check win
            let playerswins = object[item.playerB.name].wins;
            object[item.playerB.name].wins = checkWinB(playerswins, ahand, bhand);

            /*if (ahand === bhand) {
                // tie, do nothing
                console.log("b-check, tie, do nothing");
            }
            else if (ahand === "SCISSORS") {
                if (bhand === "ROCK") {
                    object[item.playerB.name].wins++; // b won, increase wins
                    console.log("b-check, b won");
                }
                else if (bhand === "PAPER") {
                    // a won, do nothing
                    console.log("b-check, a won, do nothing");
                }
            }
            else if (ahand === "ROCK") {
                if (bhand === "SCISSORS") {
                    // a won, do nothing
                    console.log("b-check, a won, do nothing");
                }
                else if (bhand === "PAPER") {
                    object[item.playerB.name].wins++; // b won, increase wins
                    console.log("b-check, b won");
                }
            }
            else if (ahand === "PAPER") {
                if (bhand === "ROCK") {
                    // a won, do nothing
                    console.log("b-check, a won, do nothing");
                }
                else if (bhand === "SCISSORS") {
                    object[item.playerB.name].wins++; // b won, increase wins
                    console.log("b-check, b won");
                }
            }*/
        }
        console.log("object.item.playerB.name: " + JSON.stringify(object[item.playerB.name]));

        return object;
    }, {});

    //console.log("grouped: " + JSON.stringify(grouped));
    //console.log("grouped type: " + typeof grouped);

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
                "winratio": ratio,
                "mostplayedhand" : mostcommonhand
            }
        );
    }
    
   console.log("games: " + JSON.stringify(rowdata));   

    return (
        <div>
            <h1>Past games</h1>

            <div className="ag-theme-material" style={{ height: '600px', width: '70%', margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={rowdata}
                    pagination={true}
                    paginationPageSize={20}>
                </AgGridReact>                     
            </div>

        </div>
    );

}

export default Past;