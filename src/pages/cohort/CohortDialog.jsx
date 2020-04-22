import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';

export default function CohortDialog(props) {
  const { cohorts, open, toggle, setCohort } = props;
  const [selectedCohortInd, setCohortInd] = useState(null);

  return (
    <Dialog
      open={open}
      onClose={() => toggle(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Choose a cohort</DialogTitle>
      <DialogContent>
        <List component="nav" aria-label="main mailbox folders">
          {cohorts.map((cohort, index) => (
            <ListItem
              button
              className="cohortListItem"
              selected={selectedCohortInd === index}
              onClick={() => setCohortInd(index)}
              key={`cohort-${index}`}
            >
              <ListItemText
                primary={cohort.cohort_id}
                secondary={
                  <>
                    {JSON.stringify(cohort)}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => toggle(false)}
          disabled
        >
          Add a cohort
        </Button>
        <Button
          onClick={() => {
            toggle(false);
            setCohort(selectedCohortInd);
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
