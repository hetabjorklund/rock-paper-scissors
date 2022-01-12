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
        { headerName: "Player", field: "name", sortable: true, filter: true },
        { headerName: "Number of matches", field: "numberofmatches", sortable: true, filter: true },
        { headerName: "Matches played", field: "matchesplayed", sortable: true, filter: true },
        { headerName: "Win ratio", field: "winratio", sortable: true, filter: true },        
        { headerName: "Most played hand", field: "mostplayedhand", sortable: true, filter: true }
    ];

    // array for all the data fetched
    const [histdata, setHistdata] = useState([]);

    // array for the row data
    let rowdata = [];

    let player = {
        "name": "",
        "numberofmatches": 0,
        "matchesplayed": [],
        "winratio": 0.0,
        "mostplayedhand" : ""
    };

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
    //console.log("histdata type: " + typeof histdata); // object
    //console.log("histdata-jsonstringify: " + JSON.stringify(histdata));
    //console.log("histdata size: " + histdata.length)

    // divide games into groups based on player name
    const grouped = histdata.reduce((object, item) => {
        // check player A
        if (!object[item.playerA.name]) { // if the player doesn't exist yet

            console.log("object: " + JSON.stringify(object));
            console.log("item: " + JSON.stringify(item));

            object[item.playerA.name] = { "games": [], "hands": [] }; // create one with two values, both contain an array            
            object[item.playerA.name].games.push(item); // push the item itself into games
            object[item.playerA.name].hands.push(item.playerA.played); // push the played hand into hands

            console.log("object.item.playerA.name: " + JSON.stringify(object[item.playerA.name]));
        }        
        else { // if the player exits, push into the existing one
            object[item.playerA.name].games.push(item); // push the item into games
            object[item.playerA.name].hands.push(item.playerA.played) // push the played hand into hands
        }

        // check player B
        if (!object[item.playerB.name]) { // if the player doesn't exist yet
            object[item.playerB.name] = { "games": [], "hands": [] }; // create one with two values, both contain an array
            object[item.playerB.name].games.push(item); // push the item itself into games
            object[item.playerB.name].hands.push(item.playerB.played); // push the played hand into hands            
        }
        else { // if the player exits, push into the existing one
            object[item.playerB.name].games.push(item); // push the item into games
            object[item.playerB.name].hands.push(item.playerB.played) // push the played hand into hands
        }

        return object;
    }, {});

    //console.log("grouped: " + JSON.stringify(grouped));
    //console.log("grouped type: " + typeof grouped);

    // set the row data for the table
    for (const [key, value] of Object.entries(grouped)) {
        console.log(`${key}: ${JSON.stringify(value)}`);

        // for each player, get the game id's
        let gameids = [];
        value.games.forEach(v => {
            //console.log(v.gameId);
            gameids.push(v.gameId);
        });        

        // for each player, get the most played hand
        let mostcommonhand = _.head(_(value.hands)
            .countBy()
            .entries()
            .maxBy(_.last));
        
        // push the data into the games array
        rowdata.push(
            {
                "name": key,
                "numberofmatches": value.games.length,
                "matchesplayed": gameids,
                "winratio": 0.0,
                "mostplayedhand" : mostcommonhand
            }
        );
    }
    
    console.log("games: " + JSON.stringify(rowdata));

   

    return (
        <div>
            <h1>Past games</h1>

            <div className="ag-theme-material" style={{ height: '700px', width: '70%', margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={rowdata}>
                </AgGridReact>                     
            </div>

        </div>
    );

}

export default Past;