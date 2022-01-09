import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import postmandata from './static/postmanresponse.json';

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

    const tiedot = postmandata.data;
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
    useEffect(() => setHistdata(postmandata.data[0]), []);
    
    console.log("histdata: " + histdata);
    console.log("histdatan tyyppi: " + typeof histdata); // object
    //console.log("histdata-parsed: " + JSON.parse(histdata));
    console.log("histdata-jsonstringify: " + JSON.stringify(histdata));
    console.log("histdatan koko " + histdata.length)

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