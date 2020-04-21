import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './cohort.css';

import API from '../../API';

function Cohort() {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <div id="cohortContainer">
      <IconButton
        onClick={(e) => setAnchorEl(e.target)}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Home</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Feature Identifiers</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Feature List</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Explore</MenuItem>
      </Menu>
    </div>
  );
}

export default Cohort;
