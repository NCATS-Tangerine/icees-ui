import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import './home.css';

function Home(props) {
  const { store } = props;
  const [table, updateTable] = useState('');
  const [year, updateYear] = useState('');
  const [dataSource, updateDataSource] = useState('UNCCHCS');
  return (
    <div id="homeContainer">
      <Paper elevation={15} id="homePaper">
        <h1>ICEES+ KP</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div id="homeInputs">
          <TextField
            label="Table"
            placeholder="patient"
            value={table}
            onChange={(e) => updateTable(e.target.value)}
          />
          <TextField
            label="Year"
            placeholder="2010"
            type="number"
            value={year}
            onChange={(e) => updateYear(e.target.value)}
          />
          <FormControl>
            <InputLabel id="data-source">Data Source</InputLabel>
            <Select
              labelId="data-source"
              id="dataSource"
              value={dataSource}
              onChange={(e) => updateDataSource(e.target.value)}
            >
              <MenuItem value="UNCCHCS">UNCCHCS</MenuItem>
              <MenuItem value="EPR">EPR</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="footer">
          <Button
            variant="contained"
            onClick={() => store.getCohortDictionary({ table, year, dataSource })}
          >
            Continue
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default Home;
