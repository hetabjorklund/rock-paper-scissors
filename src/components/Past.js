import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Past() {

    // columns for the table
    const columns = [
        { headerName: "Player", field: "player", sortable: true, filter: true },
        { headerName: "Number of matches", field: "numberofmatches", sortable: true, filter: true },
        { headerName: "Matches played", field: "matchesplayed", sortable: true, filter: true },
        { headerName: "Win ratio", field: "winratio", sortable: true, filter: true },        
        { headerName: "Most played hand", field: "mostplayedhand", sortable: true, filter: true }
    ];

    // array for all the data fetched
    const [histdata, setHistdata] = useState([]);

    // array for the row data
    const [rowdata, setRowdata] = useState([]);

    // fetch all data from API
    const fetchData = () => {
        fetch('https://bad-api-assignment.reaktor.com/rps/history')
            .then(response => response.json())
            .then(data => setHistdata(data.content))
            .catch(error => console.error(error));
    };

    // useEffect here
    useEffect(() => fetchData(), []);
    console.log("histdata: " + histdata);
    console.log("histdata-jsonstringify: " + JSON.stringify(histdata));

    return (
        <div>
            <h1>Past games here</h1>

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