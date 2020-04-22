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

import FeatureAssociation from './FeatureAssociation';
import FeatureExploration from './FeatureExploration';
import CohortDialog from './CohortDialog';

function Cohort(props) {
  const { store } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [tab, setTab] = useState(0);
  const [openCohorts, toggleCohorts] = useState(true);
  const [cohortInd, setCohortInd] = useState(-1);

  function featureAssociate(features) {
    store.associateFeatures(cohortInd, features);
  }

  function featureExplore(feature) {
    store.exploreFeature(cohortInd, feature);
  }

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
        <h1>{cohortInd > -1 ? store.cohorts[cohortInd].cohort_id : "Cohort"}</h1>
        <Button
          variant="contained"
          onClick={() => toggleCohorts(true)}
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
          explore={featureExplore}
        />
        <FeatureAssociation
          tab={tab}
          associate={featureAssociate}
        />
      </Paper>
      <CohortDialog
        cohorts={store.cohorts}
        open={openCohorts}
        toggle={toggleCohorts}
        setCohort={setCohortInd}
      />
    </div>
  );
}

export default Cohort;
