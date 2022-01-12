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
    const [rowdata, setRowdata] = useState([]);

    let player = {
        "name": "",
        "numberofmatches": 0,
        "matchesplayed": [],
        "winratio": 0.0,
        "mostplayedhand" : ""
    };

    //const tiedot = postmandata.data;
    const tiedot = testdata.data;
    console.log("tässä tiedot" + tiedot);
    console.log("tiedon tyyppi " + typeof tiedot);

    // fetch all data from API
    /*const fetchData = () => {
        fetch('http://bad-api-assignment.reaktor.com/rps/history')        
        .then(response => response.json())
        .then(responseData => setHistdata(responseData.data))
        .catch(error => console.error(error));
    };*/

    // useEffect here
    //useEffect(() => setHistdata(postmandata.data[0]), []);
    useEffect(() => setHistdata(testdata.data), []);
    
    console.log("histdata: " + histdata);
    console.log("histdatan tyyppi: " + typeof histdata); // object
    console.log("histdata-jsonstringify: " + JSON.stringify(histdata));
    console.log("histdatan koko " + histdata.length)

    // divide games into groups based on player name
    const grouped = histdata.reduce((object, item) => {
        if (!object[item.playerA.name]) {
            object[item.playerA.name] = [];
        }      
        object[item.playerA.name].push(item);

        if (!object[item.playerB.name]) {
            object[item.playerB.name] = [];
        }      
        object[item.playerB.name].push(item);

        return object;
    }, {});

    console.log("grouped: " + JSON.stringify(grouped));
    console.log("grouped tyyppi " + typeof grouped);
    console.log("grouped 0: " + grouped[1].toString());

    
    
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
                    rowData={rowdata}>
                </AgGridReact>                     
            </div>

        </div>
    );

}

export default Past;