import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CohortDialog(props) {
  const {
    store, open, toggle,
  } = props;
  const [selectedCohortInd, setCohortInd] = useState(null); // initialize null if there are no cohorts

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (store.selectedCohort !== null) {
          toggle(false);
        }
      }}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Choose a cohort</DialogTitle>
      <form onSubmit={(e) => { e.preventDefault(); toggle(false); store.setCohort(selectedCohortInd); }}>
        <DialogContent className="cohortDialogContent">
          {!store.loading ? (
            <List>
              {store.cohorts.map((cohort, index) => (
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
          ) : (
            <CircularProgress size={50} thickness={5} />
          )}
        </DialogContent>
        <DialogActions>
          {selectedCohortInd === null && (
            <Button
              onClick={() => store.setPage(0)}
            >
              Cancel
            </Button>
          )}
          <div className="divider" />
          <Button
            onClick={() => toggle(false)}
            disabled
          >
            Add a cohort
          </Button>
          <Button
            disabled={selectedCohortInd === null}
            type="submit"
          >
            Ok
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
