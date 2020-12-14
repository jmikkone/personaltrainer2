import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import CustTraList from './components/CustTraList';
import Customerslist from './components/Customerslist';
import Trainingslist from './components/Trainingslist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import{BrowserRouter,Switch,Route} from 'react-router-dom';
import CalendarView from './components/Calendar';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
} 


function App() {
 
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 
 

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
        <Typography variant='h6'>
            PERSONALTRAINER
          </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Customers and Trainings" {...a11yProps(0)} ></Tab>
          <Tab label="Customers" {...a11yProps(1)} ></Tab>
          <Tab label="Trainings" {...a11yProps(2)}></Tab>
          <Tab label="Calendar" {...a11yProps(3)}></Tab>
        </Tabs>
          
        </Toolbar>
      </AppBar>

      <TabPanel value={value} index={0}>
      <BrowserRouter>
      <Switch>
      <Route component={CustTraList}/>
      </Switch>
      </BrowserRouter>
      </TabPanel>

      <TabPanel value={value} index={1}>
      <BrowserRouter>
      <Switch>
      <Route component={Customerslist}/>
      </Switch>
      </BrowserRouter>
      </TabPanel>

      <TabPanel value={value} index={2}>
      <BrowserRouter>
      <Switch>
      <Route component={Trainingslist}/>
      </Switch>
      </BrowserRouter>
      </TabPanel>

      <TabPanel value={value} index={3}>
      <BrowserRouter>
      <Switch>
      <Route component={CalendarView}/>
      </Switch>
      </BrowserRouter>
      </TabPanel>
     
      
    </div>
  );
}

export default App;
