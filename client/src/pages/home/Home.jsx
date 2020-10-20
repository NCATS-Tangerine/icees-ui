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

  function submit(e) {
    e.preventDefault();
    store.getCohortDictionary({ table, year, dataSource })
  }

  return (
    <div id="homeContainer">
      <Paper elevation={15} id="homeTitle" className="homePagePaper">
        <h1 id="icees_title">ICEES</h1>
        <h2 id="icees_text">
          <b>I</b>ntegrated <b>C</b>linical and <b>E</b>nvironmental <b>E</b>xposures <b>S</b>ervice
        </h2>
        <p>
          ICEES provides regulatory-compliant access to clinical data derived from electronic health records,
          survey data, and genomic data (SNPs) on patients within UNC Health and participants within the
          Environmental Polymorphisms Registry (EPR) at the National Institute of Environmental Health Sciences.
          ICEES is currently restricted to UNC Health patients and EPR participants with asthma-like conditions.
          However, the service was developed as a disease-agnostic framework and approach to overcome the
          regulatory, cultural, and technical challenges that hinder efforts to openly share clinical data,
          and new use cases are in development, including those focused on COVID-19, drug-induced liver injury,
          and primary ciliary dyskinesia.
          <br /><br />
          Additional information on ICEES can be
          found <a href="https://researchsoftwareinstitute.github.io/data-translator/apps/icees" target="_blank" rel="noopener noreferrer">here</a>.
          <br /><br />
          The ICEES API can be accessed <a href="https://icees.renci.org:16340/apidocs/" target="_blank" rel="noopener noreferrer">here</a>.
          <br /><br />
          We welcome new user engagement! Please post issues, comments, and suggestions on
          the UI <a href="https://github.com/NCATS-Tangerine/icees-ui/issues" target="_blank" rel="noopener noreferrer">here</a> and
          the API <a href="https://github.com/NCATS-Tangerine/icees-api/issues" target="_blank" rel="noopener noreferrer">here</a>.
        </p>
      </Paper>
      <Paper elevation={15} id="homeForm" className="homePagePaper">
        <form onSubmit={submit} id="homepageForm">
          <h2>Start exploring!</h2>
          <div id="homeInputs">
            <TextField
              autoFocus
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
                <MenuItem value="UNCCHCS">UNC Health</MenuItem>
                <MenuItem value="EPR">EPR</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div id="formSubmit">
            <Button
              variant="contained"
              type="submit"
            >
              Explore
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default Home;
