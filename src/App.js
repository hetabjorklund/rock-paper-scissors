import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Past from './components/Past';
import Current from './components/Current';

function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      
      <AppBar position="static">
        <Toolbar>
          <Typography align="center" variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Rock, paper, scissors!
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} >
              <Tab label="Current games" value="1" />
          {/* <Tab label="Past games" value="2" /> */}
            </TabList>
          </Box>
          <TabPanel value="1"> <Current /> </TabPanel>
          {/* <TabPanel value="2"> <Past /> </TabPanel> */}
        </TabContext>
        </Box>

    </div>
  );
}

export default App;
