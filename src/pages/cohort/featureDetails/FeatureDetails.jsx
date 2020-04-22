import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

import './featureDetails.css';

export default function FeatureDetails(props) {
  const { feature } = props;
  return (
    <div className="featureRow">
      <TextField
        label="Feature"
        placeholder="Feature"
        value={feature.feature}
        onChange={(e) => feature.update(e.target.value)}
      />
      <div className="featureDetailsContainer">
        {feature.details.map((detail, index) => (
          <div key={`feature-detail-${index}`}>
            <FormControl className="featureDetailOperator">
              <InputLabel id={`operator-select-${index}`}>Operator</InputLabel>
              <Select
                labelId={`operator-select-${index}`}
                id={`operator-${index}`}
                value={feature.details[index].operator}
                onChange={(e) => feature.updateDetail(index, 'operator', e.target.value)}
              >
                <MenuItem value="=">=</MenuItem>
                <MenuItem value="+">+</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Value"
              placeholder="value"
              value={feature.details[index].value}
              onChange={(e) => feature.updateDetail(index, 'value', e.target.value)}
            />
            <IconButton
              onClick={() => feature.remove(index)}
            >
              <HighlightOffTwoToneIcon />
            </IconButton>
          </div>
        ))}
        <IconButton
          onClick={feature.add}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
}