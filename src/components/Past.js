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
    //const [rowdata, setRowdata] = useState([]);

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
    /*const fetchData = () => {
        fetch('http://bad-api-assignment.reaktor.com/rps/history')        
        .then(response => response.json())
        .then(responseData => setHistdata(responseData.data))
        .catch(error => console.error(error));
    };*/

    // useEffect to set the data
    //useEffect(() => setHistdata(postmandata.data), []);
    useEffect(() => setHistdata(testdata.data), []);
    
    //console.log("histdata: " + histdata);
    //console.log("histdata type: " + typeof histdata); // object
    //console.log("histdata-jsonstringify: " + JSON.stringify(histdata));
    //console.log("histdata size: " + histdata.length)

    // divide games into groups based on player name
    const grouped = histdata.reduce((object, item) => {
        if (!object[item.playerA.name]) { // if the player doesn't exist yet
            object[item.playerA.name] = []; // create one

            console.log("objekti: " + JSON.stringify(object[item.playerA.name]));

            let hands = []; // list of hands the player has played
            hands.push(item.playerA.played); // add the played hand to the list

            console.log("hands: " + hands);
            //object[item.playerA.name].hands = hands; // "hands" property is a list of hands played, each hand is a string

        }      
        object[item.playerA.name].push(item); // if the player exits, push into the existing one

        if (!object[item.playerB.name]) {
            object[item.playerB.name] = [];
        }      
        object[item.playerB.name].push(item);

        return object;
    }, {});

    console.log("grouped: " + JSON.stringify(grouped));
    console.log("grouped type: " + typeof grouped);

    let games = []
    for (const [key, value] of Object.entries(grouped)) {
        console.log(`${key}: ${JSON.stringify(value)}`);

        // for each value, get the game id's
        let gameids = [];
        value.forEach(v => {
            //console.log(v.gameId);
            gameids.push(v.gameId);
          });        
        
        // push the data into the games array for the table
        games.push(
            {
                "name": key,
                "numberofmatches": value.length,
                "matchesplayed": gameids,
                "winratio": 0.0,
                "mostplayedhand" : ""
            }
        );
    }
    
    console.log("games: " + JSON.stringify(games));

    //setRowdata(games);    
    
    /*
    let player = {
        "name": "",
        "numberofmatches": 0,
        "matchesplayed": [],
        "winratio": 0.0,
        "mostplayedhand" : ""
    };*/

    // A: käydään ryhmittäin jaetut pelit läpi ja luodaan jokaisesta olio joka voidaan antaa taulukolle
    /*let games = []
    for (let [activity, trainings] of Object.entries(grouped)) {
        let duration = _.sumBy(trainings, "duration");
        games.push(
            {
                "activity": activity,
                "duration": duration
            });
    }*/
    

    return (
        <div>
            <h1>Past games</h1>

            <div className="ag-theme-material" style={{ height: '700px', width: '70%', margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={games}>
                </AgGridReact>                     
            </div>

        </div>
    );

}

export default Past;