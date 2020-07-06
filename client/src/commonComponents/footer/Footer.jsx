import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './footer.css';

export default function Footer() {
  const [open, toggleOpen] = useState(false);
  const diagRef = useRef(null);

  return (
    <div id="icees_footer">
      <p>
        ICEES+ is a joint creation of RENCI, NC TraCS, NIEHS, and CoVar with support provided by
        the National Center for Advancing Translational Sciences,
        National Institutes of Health [OT3TR002020, OT2TR003430, UL1TR002489] and
        the Intramural Research Program of the National Institute of Environmental Health Sciences,
        National Institutes of Health.
        See <Button
          onClick={() => toggleOpen(true)}
          id="link-button"
        >
          Terms and Conditions of Service
        </Button>.
      </p>
      <Dialog
        open={open}
        onClose={() => toggleOpen(false)}
        scroll="paper"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="dialog-title">Terms and Conditions of Service</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="dialog-description"
            ref={diagRef}
            tabIndex={-1}
          >
            The Translator Integrated Clinical and Environmental Exposures Service (ICEES+)
            is providing you with Data that have been de-identified in accordance
            with 45 C.F.R. §§ 164.514(a) and (b) of HIPAA and that UNC Health is
            permitted to provide under 45 C.F.R. § 164.502(d)(2). Recipient agrees to notify
            UNC Health via RENCI in the event that Recipient receives any identifiable data
            in error and to take such measures to return the identifiable data and/or destroy
            it at the direction of UNC Health.
            <br /><br />
            <i>Restrictions on Recipient’s Use of Data.</i>
            <br />
            Recipient further agrees to use the Data exclusively for the purposes and functionalities
            provided by the ICEES+ service: cohort discovery; feature-rich cohort discovery;
            hypothesis-driven queries; and exploratory queries. Recipient agrees to use appropriate
            safeguards to protect the Data from misuse and unauthorized access or disclosure.
            Recipient will report to UNC Health any unauthorized access, use, or disclosure of the
            Data not provided for by the Service of which Recipient becomes aware. Recipient will not
            attempt to identify the individuals whose information is contained in any Data transferred
            pursuant to this Service Agreement or attempt to contact those individuals. Recipient
            agrees not to sell the Data to any third party for any purpose. Recipient agrees not
            to disclose or publish the Data in any manner that would identify the Data as originating
            from UNC Health. Finally, Recipient agrees to reasonably limit the number of queries to the
            Service per IP address within a given time interval, in order to prevent rapid ‘attacks’ on
            the Service.
            <br /><br />
            We kindly request that users of this service provide proper attribution for any secondary
            products (e.g., manuscripts, podium presentations, software) derived from the use of ICEES+.
            Attribution should include acknowledgement of support from the National Center for
            Advancing Translational Sciences, National Institutes of Health [OT3TR002020, OT2TR003430, UL1TR002489]
            and the Intramural Research Program of the National Institute of Environmental Health Sciences,
            National Institutes of Health. Finally, please acknowledge or, if appropriate,
            include as co-author(s) any individual person(s) who contributed significantly to secondary
            products resulting from use of ICEES+.
            <br /><br />
            For additional information or to report issues, please contact Karamarie Fecho (kfecho@renci.org).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}