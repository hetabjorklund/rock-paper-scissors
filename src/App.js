import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Past from './components/Past';
import Current from './components/Current';

function App() {  

  return (
    <div className="App">
      
      <AppBar position="static">
        <Toolbar>
          <Typography align="center" variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Rock, paper, scissors!
          </Typography>
        </Toolbar>
      </AppBar>

      <Current /> 
      <Past /> 

    </div>
  );
}

export default App;
