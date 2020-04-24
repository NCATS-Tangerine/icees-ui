import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function Header(props) {
  const { store, toggleCohorts } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  return (
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
        <MenuItem onClick={() => { setAnchorEl(null); store.setPage(0); }}>Home</MenuItem>
        <MenuItem disabled onClick={() => setAnchorEl(null)}>Feature Identifiers</MenuItem>
        <MenuItem disabled onClick={() => setAnchorEl(null)}>Feature List</MenuItem>
        <MenuItem disabled onClick={() => setAnchorEl(null)}>Explore</MenuItem>
      </Menu>
      <h1>{store.selectedCohort !== null ? store.selectedCohort.cohort_id : "Cohort"}</h1>
      <Button
        variant="contained"
        onClick={() => toggleCohorts(true)}
      >
        Change Cohort
      </Button>
    </div>
  );
}
