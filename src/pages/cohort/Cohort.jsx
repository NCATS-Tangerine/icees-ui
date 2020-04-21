import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './cohort.css';

// import API from '../../API';
import FeatureAssociation from './FeatureAssociation';
import FeatureExploration from './FeatureExploration';

function Cohort() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tab, setTab] = useState(0);

  return (
    <div id="cohortContainer">
      <div className="header">
        <IconButton
          onClick={(e) => setAnchorEl(e.target)}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>Home</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Feature Identifiers</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Feature List</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Explore</MenuItem>
        </Menu>
        <h1>Cohort</h1>
        <Button
          variant="contained"
          onClick={() => console.log('open cohort dialog')}
        >
          Change Cohorts
        </Button>
      </div>
      <Paper id="cohortPaper">
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="One Feature Exploration" />
          <Tab label="Two Feature Association" />
        </Tabs>
        <FeatureExploration
          tab={tab}
        />
        <FeatureAssociation
          tab={tab}
        />
      </Paper>
    </div>
  );
}

export default Cohort;
